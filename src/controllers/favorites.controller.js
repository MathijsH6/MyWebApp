const service = require('../services/favorites.service');

function add(req, res) {
  service.add(req.session.customer_id, req.body.filmId, (err) => {
    if (err) return res.status(500).json({ error: 'Databasefout.' });
    res.json({ success: true });
  });
}

function remove(req, res) {
  service.remove(req.session.customer_id, req.body.filmId, (err) => {
    if (err) return res.status(500).json({ error: 'Databasefout.' });
    res.json({ success: true });
  });
}

function list(req, res) {
  service.list(req.session.customer_id, (err, ids) => {
    if (err) return res.status(500).json({ error: 'Databasefout.' });
    res.json({ favoriteIds: ids });
  });
}

module.exports = { add, remove, list };