const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../dao/db');

router.get('/', (req, res) => {
  res.render('login', {
    customer_id: req.session.customer_id || null,
    favoriteIds: []
  });
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  pool.query(
    'SELECT * FROM customer WHERE email = ?',
    [email],
    async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).render('login', {
          error: 'Onjuiste gegevens.',
          customer_id: null,
          favoriteIds: []
        });
      }
      const user = results[0];
      const match = await bcrypt.compare(password, user.password || '');
      if (!match) {
        return res.status(401).render('login', {
          error: 'Onjuiste gegevens.',
          customer_id: null,
          favoriteIds: []
        });
      }
      req.session.customer_id = user.customer_id;
      res.redirect('/');
    }
  );
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;