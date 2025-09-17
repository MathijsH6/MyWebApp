const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../dao/db');
const { validateRegister } = require('../middleware/validation');

// GET: Toon formulier, vul met bestaande data als ingelogd
router.get('/', (req, res) => {
  if (req.session.customer_id) {
    pool.query(
      `SELECT c.*, a.address, a.address2, a.district, a.postal_code, ci.city, co.country
       FROM customer c
       JOIN address a ON c.address_id = a.address_id
       JOIN city ci ON a.city_id = ci.city_id
       JOIN country co ON ci.country_id = co.country_id
       WHERE c.customer_id = ?`,
      [req.session.customer_id],
      (err, results) => {
        res.render('register', {
          customer_id: req.session.customer_id,
          favoriteIds: [],
          films: [],
          user: results[0] || null,
          error: null
        });
      }
    );
  } else {
    res.render('register', {
      customer_id: null,
      favoriteIds: [],
      films: [],
      user: null,
      error: null
    });
  }
});

// POST: Registratie of profiel bijwerken
router.post('/', validateRegister, async (req, res) => {
  const {
    email,
    firstname,
    lastname,
    password,
    address1,
    address2,
    postcode,
    city,
    country
  } = req.body;

  // Als ingelogd: update bestaande gebruiker
  if (req.session.customer_id) {
    // 1. Zoek country/city op of voeg toe
    pool.query('SELECT country_id FROM country WHERE country = ?', [country], (errCountry, countryResults) => {
      if (errCountry) return res.status(500).render('register', { error: 'Land ophalen mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
      let country_id = countryResults.length > 0 ? countryResults[0].country_id : null;
      function afterCountry() {
        pool.query('SELECT city_id FROM city WHERE city = ? AND country_id = ?', [city, country_id], (errCity, cityResults) => {
          if (errCity) return res.status(500).render('register', { error: 'Stad ophalen mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
          let city_id = cityResults.length > 0 ? cityResults[0].city_id : null;
          function afterCity() {
            // Update address
            pool.query(
              `UPDATE address a
               JOIN customer c ON c.address_id = a.address_id
               SET a.address = ?, a.address2 = ?, a.district = ?, a.postal_code = ?, a.city_id = ?, a.phone = ?, a.location = ST_GeomFromText(?)
               WHERE c.customer_id = ?`,
              [address1, address2 || null, city, postcode, city_id, '0123456789', 'POINT(0 0)', req.session.customer_id],
              async (err) => {
                if (err) return res.status(500).render('register', { error: 'Adres bijwerken mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
                // Update customer
                const hash = password ? await bcrypt.hash(password, 10) : null;
                pool.query(
                  `UPDATE customer SET first_name = ?, last_name = ?, email = ?${hash ? ', password = ?' : ''} WHERE customer_id = ?`,
                  hash
                    ? [firstname, lastname, email, hash, req.session.customer_id]
                    : [firstname, lastname, email, req.session.customer_id],
                  (err2) => {
                    if (err2) return res.status(500).render('register', { error: 'Account bijwerken mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
                    res.redirect('/');
                  }
                );
              }
            );
          }
          if (city_id) {
            afterCity();
          } else {
            pool.query('INSERT INTO city (city, country_id, last_update) VALUES (?, ?, NOW())', [city, country_id], (errInsertCity, resultCity) => {
              if (errInsertCity) return res.status(500).render('register', { error: 'Stad toevoegen mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
              city_id = resultCity.insertId;
              afterCity();
            });
          }
        });
      }
      if (country_id) {
        afterCountry();
      } else {
        pool.query('INSERT INTO country (country, last_update) VALUES (?, NOW())', [country], (errInsertCountry, resultCountry) => {
          if (errInsertCountry) return res.status(500).render('register', { error: 'Land toevoegen mislukt.', customer_id: req.session.customer_id, favoriteIds: [], films: [], user: req.body });
          country_id = resultCountry.insertId;
          afterCountry();
        });
      }
    });
  } else {
    // Registratie nieuwe gebruiker (jouw bestaande code)
    pool.query('SELECT customer_id FROM customer WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).render('register', { error: 'Databasefout.', customer_id: null, favoriteIds: [], films: [], user: null });
      if (results.length > 0) {
        return res.status(400).render('register', { error: 'Dit e-mailadres is al in gebruik.', customer_id: null, favoriteIds: [], films: [], user: null });
      }
      pool.query('SELECT country_id FROM country WHERE country = ?', [country], (errCountry, countryResults) => {
        if (errCountry) return res.status(500).render('register', { error: 'Land toevoegen mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
        let country_id = countryResults.length > 0 ? countryResults[0].country_id : null;
        function afterCountry() {
          pool.query('SELECT city_id FROM city WHERE city = ? AND country_id = ?', [city, country_id], (errCity, cityResults) => {
            if (errCity) return res.status(500).render('register', { error: 'Stad toevoegen mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
            let city_id = cityResults.length > 0 ? cityResults[0].city_id : null;
            function afterCity() {
              pool.query(
                'INSERT INTO address (address, address2, district, postal_code, city_id, phone, location, last_update) VALUES (?, ?, ?, ?, ?, ?, ST_GeomFromText(?), NOW())',
                [address1, address2 || null, city, postcode, city_id, '0123456789', 'POINT(0 0)'],
                async (err2, result2) => {
                  if (err2) return res.status(500).render('register', { error: 'Adres toevoegen mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
                  const address_id = result2.insertId;
                  const hash = await bcrypt.hash(password, 10);
                  pool.query(
                    'INSERT INTO customer (store_id, first_name, last_name, email, address_id, active, create_date, password) VALUES (?, ?, ?, ?, ?, 1, NOW(), ?)',
                    [1, firstname, lastname, email, address_id, hash],
                    (err3, result3) => {
                      if (err3) return res.status(500).render('register', { error: 'Registratie mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
                      pool.query('SELECT * FROM customer WHERE email = ?', [email], (err4, results4) => {
                        if (err4 || results4.length === 0) return res.redirect('/login');
                        req.session.customer_id = results4[0].customer_id;
                        res.redirect('/');
                      });
                    }
                  );
                }
              );
            }
            if (city_id) {
              afterCity();
            } else {
              pool.query('INSERT INTO city (city, country_id, last_update) VALUES (?, ?, NOW())', [city, country_id], (errInsertCity, resultCity) => {
                if (errInsertCity) return res.status(500).render('register', { error: 'Stad toevoegen mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
                city_id = resultCity.insertId;
                afterCity();
              });
            }
          });
        }
        if (country_id) {
          afterCountry();
        } else {
          pool.query('INSERT INTO country (country, last_update) VALUES (?, NOW())', [country], (errInsertCountry, resultCountry) => {
            if (errInsertCountry) return res.status(500).render('register', { error: 'Land toevoegen mislukt.', customer_id: null, favoriteIds: [], films: [], user: null });
            country_id = resultCountry.insertId;
            afterCountry();
          });
        }
      });
    });
  }
});

module.exports = router;