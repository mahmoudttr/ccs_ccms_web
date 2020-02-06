const express = require('express');
const router = express.Router();

// Require controller modules.
const {isAuthenticated} = require('../app/middlewares/isAuthenticated');
const loginController = require('../app/controllers/auth/loginController');

// Authentications.
router.get('/login', loginController.showLoginForm);
router.post('/login', loginController.login);


router.get('/me', function (req, res) {
    var cookie = req.cookies || null;
    res.send(cookie);
});

router.get('/logout',function (req, res) {
    res.clearCookie('accessToken');
    res.redirect('/login');
});

//router.use(isAuthenticated);

module.exports = router;
