const express = require('express');
const router = express.Router();
const pool = require('../dao/db');

// Favoriet toevoegen
router.post('/add', (req, res) => {
  if (!req.session.customer_id) {
    return res.status(401).json({ error: 'Je bent niet ingelogd. Maak een account aan en log in.' });
  }
  const { filmId } = req.body;
  pool.query(
    'INSERT IGNORE INTO customer_favorite (customer_id, film_id) VALUES (?, ?)',
    [req.session.customer_id, filmId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Databasefout.' });
      res.json({ success: true });
    }
  );
});

// Favoriet verwijderen
router.post('/remove', (req, res) => {
  if (!req.session.customer_id) {
    return res.status(401).json({ error: 'Je bent niet ingelogd.' });
  }
  const { filmId } = req.body;
  pool.query(
    'DELETE FROM customer_favorite WHERE customer_id = ? AND film_id = ?',
    [req.session.customer_id, filmId],
    (err) => {
      if (err) return res.status(500).json({ error: 'Databasefout.' });
      res.json({ success: true });
    }
  );
});

// Favorieten ophalen voor ingelogde gebruiker
router.get('/list', (req, res) => {
  if (!req.session.customer_id) {
    return res.status(401).json({ error: 'Niet ingelogd.' });
  }
  pool.query(
    'SELECT film_id FROM customer_favorite WHERE customer_id = ?',
    [req.session.customer_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: 'Databasefout.' });
      res.json({ favoriteIds: results.map(r => r.film_id) });
    }
  );
});

module.exports = router;