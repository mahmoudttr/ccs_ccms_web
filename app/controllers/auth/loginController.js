const {rules} = require('../../requests/login');
const {throwError} = require('../../helpers/error');
const {compare} = require('bcryptjs');
const path = require('path');

// GET: Show login Form
exports.showLoginForm = function (req, res) {
    res.sendFile(path.join(__dirname+'./../../../views/login.html'));
};

// POST: login Action
exports.login = function (req, res) {

};
