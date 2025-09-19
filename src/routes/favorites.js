const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middleware/authentication');
const favoritesController = require('../controllers/favorites.controller');

router.post('/add', requireLogin, favoritesController.add);
router.post('/remove', requireLogin, favoritesController.remove);
router.get('/list', requireLogin, favoritesController.list);

module.exports = router;