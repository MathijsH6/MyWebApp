const express = require('express');
const router = express.Router();
const pool = require('../dao/db');
const { requireLogin } = require('../middleware/authentication');

// Favoriet toevoegen
router.post('/add', requireLogin, (req, res) => {
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
router.post('/remove', requireLogin, (req, res) => {
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
router.get('/list', requireLogin, (req, res) => {
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