const pool = require('./db');

function getAllMovies(callback) {
  pool.query(
    'SELECT film_id, title, description, release_year FROM film LIMIT 100',
    (error, results) => {
      callback(error, results);
    }
  );
}

function getMovieById(id, callback) {
  pool.query(
    'SELECT film_id, title, description, release_year, rental_rate, length, rating FROM film WHERE film_id = ?',
    [id],
    (error, results) => {
      callback(error, results[0]);
    }
  );
}

module.exports = { getAllMovies, getMovieById };