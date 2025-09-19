const pool = require('./db');

function addFavorite(customerId, filmId, cb) {
  pool.query(
    'INSERT IGNORE INTO customer_favorite (customer_id, film_id) VALUES (?, ?)',
    [customerId, filmId],
    cb
  );
}

function removeFavorite(customerId, filmId, cb) {
  pool.query(
    'DELETE FROM customer_favorite WHERE customer_id = ? AND film_id = ?',
    [customerId, filmId],
    cb
  );
}

function listFavorites(customerId, cb) {
  pool.query(
    'SELECT film_id FROM customer_favorite WHERE customer_id = ?',
    [customerId],
    (err, results) => cb(err, results ? results.map(r => r.film_id) : [])
  );
}

module.exports = { addFavorite, removeFavorite, listFavorites };