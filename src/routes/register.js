const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../dao/db');

router.get('/', (req, res) => {
  res.render('register', {
    customer_id: req.session.customer_id || null,
    favoriteIds: []
  });
});

router.post('/', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).render('register', { error: 'Vul alle velden in.' });
  }
  pool.query('SELECT customer_id FROM customer WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).render('register', { error: 'Databasefout.' });
    if (results.length > 0) {
      return res.status(400).render('register', { error: 'Dit e-mailadres is al in gebruik.' });
    }
    const hash = await bcrypt.hash(password, 10);
    pool.query(
      'INSERT INTO customer (store_id, first_name, last_name, email, address_id, active, create_date, password) VALUES (?, ?, ?, ?, ?, 1, NOW(), ?)',
      [1, first_name, last_name, email, 1, hash],
      (err2, result) => {
        if (err2) return res.status(500).render('register', { error: 'Registratie mislukt.' });
        pool.query(
          'SELECT * FROM customer WHERE email = ?',
          [email],
          (err3, results2) => {
            if (err3 || results2.length === 0) {
              return res.redirect('/login');
            }
            req.session.customer_id = results2[0].customer_id;
            res.redirect('/');
          }
        );
      }
    );
  });
});

module.exports = router;