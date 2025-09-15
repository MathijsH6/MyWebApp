// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const pool = require('../dao/db');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/register', (req, res) => {
//   res.render('register');
// });

// router.get('/login', (req, res) => {
//   res.render('login');
// });

// // Registration route
// router.post('/register', async (req, res) => {
//   const { first_name, last_name, email, password } = req.body;
//   if (!first_name || !last_name || !email || !password) {
//     return res.status(400).json({ error: 'Vul alle velden in.' });
//   }
//   const hash = await bcrypt.hash(password, 10);
//   // Use store_id=1 and address_id=1 for demo, adjust as needed
//   pool.query(
//     'INSERT INTO customer (store_id, first_name, last_name, email, address_id, active, create_date, password) VALUES (?, ?, ?, ?, ?, 1, NOW(), ?)',
//     [1, first_name, last_name, email, 1, hash],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: 'Registratie mislukt.' });
//       res.json({ success: true });
//     }
//   );
// });

// // Login route
// router.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   pool.query(
//     'SELECT * FROM customer WHERE email = ?',
//     [email],
//     async (err, results) => {
//       if (err || results.length === 0) return res.status(401).json({ error: 'Onjuiste gegevens.' });
//       const user = results[0];
//       const match = await bcrypt.compare(password, user.password || '');
//       if (!match) return res.status(401).json({ error: 'Onjuiste gegevens.' });
//       req.session.customer_id = user.customer_id;
//       res.json({ success: true, user: { customer_id: user.customer_id, first_name: user.first_name } });
//     }
//   );
// });

// // Logout route
// router.post('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.json({ success: true });
//   });
// });

// module.exports = router;
