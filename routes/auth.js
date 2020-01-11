const express = require('express');
const router = express.Router();

// Require controller modules.
const loginController = require('../app/controllers/auth/loginController');

// Authentications.
router.get('/login', loginController.showLoginForm);
router.post('/login', loginController.login);

module.exports = router;
