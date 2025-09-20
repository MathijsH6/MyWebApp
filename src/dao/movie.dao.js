const pool = require('./db');

function getAllMovies(callback) {
  pool.query(
    `SELECT f.film_id, f.title, f.description, f.release_year, f.rating, c.name AS genre
     FROM film f
     JOIN film_category fc ON f.film_id = fc.film_id
     JOIN category c ON fc.category_id = c.category_id
     LIMIT 100`,
    (error, results) => {
      callback(error, results);
    }
  );
}

function getAllGenres(callback) {
  pool.query(
    'SELECT category_id, name FROM category',
    (error, results) => {
      callback(error, results);
    }
  );
}

function getMovieById(id, callback) {
  pool.query(
    `SELECT f.film_id, f.title, f.description, f.release_year, f.length, f.rating, f.rental_rate, c.name AS genre
     FROM film f
     JOIN film_category fc ON f.film_id = fc.film_id
     JOIN category c ON fc.category_id = c.category_id
     WHERE f.film_id = ?`,
    [id],
    (error, results) => {
      callback(error, results[0]);
    }
  );
}

module.exports = { getAllMovies, getAllGenres, getMovieById };