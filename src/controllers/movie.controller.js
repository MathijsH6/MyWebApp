const movieService = require('../services/movie.service');

function list(req, res) {
  movieService.fetchAllMovies((err, movies) => {
    if (err) {
      res.status(500).send('Database fout');
    } else {
      res.render('movies', { films: movies, title: 'Sakila Films' });
    }
  });
}

function detail(req, res) {
  const filmId = req.params.id;
  movieService.fetchMovieById(filmId, (err, film) => {
    if (err || !film) {
      res.status(404).send('Film niet gevonden');
    } else {
      res.render('movie-detail', { film, title: film.title });
    }
  });
}

module.exports = { list, detail };