const path = require('path');
const request = require("request");
const apiURL = process.env.API_URL;

exports.index = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/group-users/index.html'));
    }
};

exports.store = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                method: 'POST',
                uri: apiURL + "/group-users",
                form: req.body,
            }
            , function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};

exports.users = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token.token
            },
            url: apiURL + "/group-users/users/" + req.params.groupName
        }, function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
    }
};



exports.groupsByUserID = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token.token
            },
            url: apiURL + "/group-users/groups/" + req.params.userId
        }, function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
    }
};



// Create and Save a new Object   == 201
exports.create = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
    }
};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {

    }
};

// Find a single Object with a customerId == 200
exports.findOne = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {

    }
};

//Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {

    }
};

//Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request.delete({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                url: apiURL + "/group-users/" + req.params.id,
            },
            function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};

//Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request.delete({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                url: apiURL + "/group-users"
            },
            function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};
