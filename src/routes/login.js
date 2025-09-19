const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.get('/', loginController.showLogin);
router.post('/', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;