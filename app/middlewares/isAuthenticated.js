const api = require('../helpers/apiResponse');
const localStorage = require('../helpers/localStorage');

isAuthenticated = (req, res, next) => {
    const token = req.cookies.accessToken || '';

    console.log(token,'222');
    if (!token) {
        res.redirect('/login');
    }
    next();
};

/*isLogin = (req, res, next) => {
    const token = req.cookies.token || '';
   // const tokenStorage = localStorage.get('accessToken') || '';
    if (!token) {
        next();
    }
    res.redirect('/login');
};*/

module.exports = {
    isAuthenticated
};
