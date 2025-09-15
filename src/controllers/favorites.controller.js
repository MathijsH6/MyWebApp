let favorites = []; // Temporary in-memory favorites

function addFavorite(req, res) {
  const filmId = req.body.filmId;
  if (!favorites.includes(filmId)) {
    favorites.push(filmId);
  }
  res.json({ success: true, favorites });
}

function removeFavorite(req, res) {
  const filmId = req.body.filmId;
  favorites = favorites.filter(id => id !== filmId);
  res.json({ success: true, favorites });
}

function listFavorites(req, res) {
  res.json({ favorites });
}

module.exports = { addFavorite, removeFavorite, listFavorites };