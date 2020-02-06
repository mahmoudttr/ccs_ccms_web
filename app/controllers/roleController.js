//const api = require('../helpers/apiResponse');
const request = require("request");
//const tokenStorage = require('../helpers/localStorage');
const apiURL = process.env.API_URL;

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
            url: apiURL+"/roles"
        }, function (error, response, body) {
            return res.status(response.statusCode).json(JSON.parse(body));
        });
    }
};
