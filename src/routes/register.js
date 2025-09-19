const express = require('express');
const router = express.Router();
const { validateRegister } = require('../middleware/validation');
const registerController = require('../controllers/register.controller');

router.get('/', registerController.showForm);
router.post('/', validateRegister, registerController.submit);

module.exports = router;