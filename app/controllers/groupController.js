const path = require('path');
const request = require("request");
//const {validate} = require('../requests/group');
const yup = require('yup');
const api = require('../helpers/apiResponse');
const apiURL = process.env.API_URL;

exports.index = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/groups/index.html'));
    }
};

exports.create = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {

    }
};

// Create and Save a new Object
exports.store = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        //await validate(req, res, next);
        const rules = yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required()
        });
        const valid = rules.validate(req.body, {abortEarly: false})
            .then(function (value) {
                request({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': token.token
                        },
                        method: 'POST',
                        url: apiURL + "/groups",
                        form: value,
                    }
                    , function (error, response, body) {
                        return res.status(response.statusCode).json(JSON.parse(body));
                    });
            })
            .catch(errors => {
                const schemaErrors = errors.inner.map(err => {
                    //return {field: err.path, message: err.message};
                    return {message: err.message};
                });
                return api.response(res, {
                    code: 422,
                    errors: schemaErrors
                });
            });
    }
};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token.token
            },
            method: 'GET',
            url: apiURL + "/groups"
        }, function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
    }
};

exports.edit = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'authorization': token.token
            },
            method: 'GET',
            url: apiURL + "/groups/" + req.params.id
        }, function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
    }
};

// Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        //await validate(req, res, next);
        const rules = yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required()
        });

        const valid = rules.validate(req.body, {abortEarly: false})
            .then(function (value) {
                request({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': token.token
                        },
                        method: 'PUT',
                        url: apiURL + "/groups/" + req.params.id,
                        form: req.body,
                    },
                    function (error, response, body) {
                        return res.status(response.statusCode).json(JSON.parse(body));
                    });
            })
            .catch(errors => {
                const schemaErrors = errors.inner.map(err => {
                    //return {field: err.path, message: err.message};
                    return {message: err.message};
                });
                return api.response(res, {
                    code: 422,
                    errors: schemaErrors
                });
            });
    }
};

// Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        request({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                method: 'DELETE',
                url: apiURL + "/groups/" + req.params.id
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
        request({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                method: 'DELETE',
                url: apiURL + "/groups"
            },
            function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};
