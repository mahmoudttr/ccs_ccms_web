const path = require('path');
const request = require("request");
const {validate} = require('../requests/group');
const yup = require('yup');
const api = require('../helpers/apiResponse');

exports.index = (req, res) => {
    return res.sendFile(path.join(__dirname + './../../views/groups/index.html'));
};

exports.create = async (req, res, next) => {

};

// Create and Save a new Object
exports.store = async (req, res, next) => {
    //await validate(req, res, next);
    const rules = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required()
    });
    const valid = rules.validate(req.body, {abortEarly: false})
        .then(function (value) {
            request({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    uri: "http://localhost:3007/api/v1/groups",
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
};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {
    request("http://localhost:3007/api/v1/groups", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(response.statusCode).json(JSON.parse(body));
        }
    });
};

exports.edit = (req, res) => {
    request("http://localhost:3007/api/v1/groups/"+req.params.id, function (error, response, body) {
        return res.status(response.statusCode).json(JSON.parse(body));
    });
};

// Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {
    //await validate(req, res, next);
    const rules = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required()
    });

    const valid = rules.validate(req.body, {abortEarly: false})
        .then(function (value) {
            request({
                    method: 'PUT',
                    url: "http://localhost:3007/api/v1/groups/" + req.params.id,
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
};

// Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    request({
            method: 'DELETE',
            url: "http://localhost:3007/api/v1/groups/" + req.params.id
        },
        function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
};

//Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    request({
            method: 'DELETE',
            url: "http://localhost:3007/api/v1/groups"
        },
        function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
};
