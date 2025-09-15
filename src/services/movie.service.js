const movieDao = require('../dao/movie.dao');


function fetchAllMovies(callback) {
  movieDao.getAllMovies(callback);
}

function fetchMovieById(id, callback) {
  movieDao.getMovieById(id, callback);
}

function fetchGenres(callback) {
  movieDao.getAllGenres(callback);
}


module.exports = { fetchAllMovies, fetchMovieById, fetchGenres };