const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const { requireLogin } = require('../middleware/authentication');

router.get('/', requireLogin, movieController.list);
router.get('/:id', requireLogin, movieController.detail);

module.exports = router;