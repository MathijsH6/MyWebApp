const movieDao = require('../dao/movie.dao');

function fetchAllMovies(callback) {
  movieDao.getAllMovies(callback);
}

function fetchMovieById(id, callback) {
  movieDao.getMovieById(id, callback);
}

module.exports = { fetchAllMovies, fetchMovieById };