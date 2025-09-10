const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

router.get('/', movieController.list);
router.get('/:id', movieController.detail)

module.exports = router;