const express = require('express');
const router = express.Router();
const { validateProfile } = require('../middleware/validation');
const profileController = require('../controllers/profile.controller');

router.get('/', profileController.showForm);
router.post('/', validateProfile, profileController.update);

module.exports = router;