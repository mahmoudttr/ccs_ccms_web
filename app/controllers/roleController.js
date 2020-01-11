const api = require('../helpers/apiResponse');
const request = require("request");

exports.findAll = (req, res) => {
    request("http://localhost:3007/api/v1/roles", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(response.statusCode).json(body);
        }
    });
};
