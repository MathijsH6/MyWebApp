const pool = require('./db');

function findByEmail(email, cb) {
  pool.query('SELECT * FROM customer WHERE email = ?', [email], (err, rows) => cb(err, rows && rows[0]));
}

module.exports = { findByEmail };