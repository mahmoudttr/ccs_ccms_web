const path = require('path');
const request = require("request");

exports.index = async (req, res, next) => {
    return res.sendFile(path.join(__dirname + './../../views/group-users/index.html'));
};

exports.store = async (req, res, next) => {
    request({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            method: 'POST',
            uri: "http://localhost:3007/api/v1/group-users",
            form: req.body,
        }
        , function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });

};

exports.users = (req, res) => {
    request("http://localhost:3007/api/v1/group-users/users/" + req.params.groupName, function (error, response, body) {
        return res.status(response.statusCode).json(JSON.parse(body));
    });
};

// Create and Save a new Object   == 201
exports.create = async (req, res, next) => {

};

// Retrieve all Objects from the database. == 200
exports.findAll = (req, res) => {

};

// Find a single Object with a customerId == 200
exports.findOne = (req, res) => {

};

//Update a Object identified by the objectId in the request == 204
exports.update = (req, res) => {

};

//Delete a Object with the specified objectId in the request
exports.delete = (req, res) => {
    request.delete("http://localhost:3007/api/v1/group-users/" + req.params.id,
        function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
};

//Delete all Objects from the database.
exports.deleteAll = (req, res) => {

};
