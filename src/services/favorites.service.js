const dao = require('../dao/favorites.dao');

function add(customerId, filmId, cb) {
  dao.addFavorite(customerId, filmId, cb);
}

function remove(customerId, filmId, cb) {
  dao.removeFavorite(customerId, filmId, cb);
}

function list(customerId, cb) {
  dao.listFavorites(customerId, cb);
}

module.exports = { add, remove, list };