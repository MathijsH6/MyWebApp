const movieService = require('../services/movie.service');
const pool = require('../dao/db');

function list(req, res) {
  movieService.fetchAllMovies((err, movies) => {
    if (err) {
      res.status(500).send('Database fout');
    } else {
      movieService.fetchGenres((err2, genres) => {
        if (err2) {
          res.status(500).send('Database fout');
        } else {
          // Unieke jaren en ratings uit films
          const years = [...new Set(movies.map(f => f.release_year))].sort();
          const ratings = [...new Set(movies.map(f => f.rating))].sort();

          // In je list(req, res) functie:
          if (req.session.customer_id) {
            pool.query(
              'SELECT film_id FROM customer_favorite WHERE customer_id = ?',
              [req.session.customer_id],
              (errFav, favResults) => {
                const favoriteIds = favResults ? favResults.map(r => r.film_id) : [];
                res.render('movies', {
                  films: movies,
                  genres,
                  years,
                  ratings,
                  title: 'Sakila Films',
                  customer_id: req.session.customer_id,
                  favoriteIds // <-- meegeven aan EJS!
                });
              }
            );
          } else {
            res.render('movies', {
              films: movies,
              genres,
              years,
              ratings,
              title: 'Sakila Films',
              customer_id: null,
              favoriteIds: []
            });
          }
        }
      });
    }
  });
}

function detail(req, res) {
  const filmId = req.params.id;
  movieService.fetchMovieById(filmId, (err, film) => {
    if (err || !film) {
      res.status(404).send('Film niet gevonden');
    } else {
      res.render('movie-detail', { film, title: film.title, customer_id: req.session.customer_id }); // <-- toegevoegd!
    }
  });
}

module.exports = { list, detail };