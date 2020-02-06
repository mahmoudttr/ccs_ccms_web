const path = require('path');
const request = require("request");
//const {validate} = require('../requests/user');
const fs = require("fs");
const yup = require('yup');
const api = require('../helpers/apiResponse');
//const tokenStorage = require('../helpers/localStorage');
const apiURL = process.env.API_URL;

exports.index = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/users/index.html'));
    }
};

// show form Add User
exports.create = (req, res) => {
    return res.sendFile(path.join(__dirname + './../../views/users/create.html'));
};

// store user in database
exports.store = async (req, res, next) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        console.log(0);
        /*  await new Promise((Resolve, Reject) => {
          });*/
        //await
        const rules = yup.object().shape({
            username: yup.string().required(),
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup.string().required().email(),
            phone_number_pbx: yup.string(),
            password: yup.string().required()
        });
        await rules.validate(req.body, {abortEarly: false})
            .then(function (value) {
                console.log(token);
                console.log(value);
                request({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': token.token
                        },
                        method: 'POST',
                        url: apiURL+"/users",
                        form: value,
                    }
                    , function (error, response, body) {
                        console.log(5552222);
                        console.log(response.statusCode);

                        return res.status(response.statusCode).json(JSON.parse(body));
                    });
            })
            .catch(errors => {
                const schemaErrors = errors.inner.map(err => {
                    return {field: err.path, message: err.message};
                });
                return api.response(res, {
                    code: 422,
                    errors: schemaErrors
                });
                console.log(2222);
            });
        console.log(7777);
        return;
        console.log(8888);
        //console.log(666);

        //  validate(req, res, next);
        //  console.log(valid);
        /*  if(valid) {

          }*/
        /*   return api.response(res,{
               code:400
           })*/
    }
};

// Retrieve all Objects from the database.
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
                url: apiURL+"/users",
            }
            , function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};

// test method
exports._findAll = (req, res) => {
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
            url: apiURL+"/users",
        }, function (error, response, body) {
            return res.sendFile(path.join(__dirname + './../../views/users/select.html', {data: body}));
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
                    'authorization': token
                },
                method: 'GET',
                url: apiURL+"/users/" + req.params.id,
            },
            function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};

// Update a Object identified by the objectId in the request
exports.update = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        const rules = yup.object().shape({
            username: yup.string().required(),
            first_name: yup.string().required(),
            last_name: yup.string().required(),
            email: yup.string().required().email(),
            phone_number_pbx: yup.string(),
            //  password: yup.string().required()
        });

        const valid = rules.validate(req.body, {abortEarly: false})
            .then(function (value) {
                request({
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'authorization': token.token
                        },
                        method: 'PUT',
                        url: apiURL+"/users/" + req.params.id,
                        form: value,
                    },
                    function (error, response, body) {
                        return res.status(response.statusCode).json(JSON.parse(body));
                    });
            })
            .catch(errors => {
                const schemaErrors = errors.inner.map(err => {
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
        request(
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': token.token
                },
                method: 'DELETE',
                url: apiURL+"/users/" + req.params.id
            }
            , function (error, response, body) {
                return res.status(response.statusCode).json(JSON.parse(body));
            });
    }
};

// Delete all Objects from the database.
exports.deleteAll = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {

    }
};
