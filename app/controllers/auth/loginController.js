//const {rules} = require('../../requests/login');
//const localStorage = require('../../helpers/localStorage');
const {compare} = require('bcryptjs');
const path = require('path');
const yup = require('yup');
const api = require('../../helpers/apiResponse');
const request = require("request");
const apiURL = process.env.API_URL;


// GET: Show login Form
exports.showLoginForm = function (req, res) {
    const token = req.cookies.accessToken || '';
    if(!token) {
        return res.sendFile(path.join(__dirname + './../../../views/login.html'));
    }else{
        res.redirect('/');
    }
};

// POST: login Action
exports.login = async function (req, res) {
    const rules = yup.object().shape({
        username: yup.string().min(3).required(),
        password: yup.string().min(5).required()
    });
    await rules.validate(req.body, {abortEarly: false})
        .then(function (value) {
            request({
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    method: 'POST',
                    uri: apiURL + "/auth/login",
                    form: value,
                }
                , function (error, response, body) {
                    body = JSON.parse(body);
                    console.log('----');
                    if (body.result == 1) {
                        console.log(body.data.user);
                        //  localStorage.store('accessToken', body.data.token);
                        // res.cookie("accessToken", body.data, {httpOnly: true, secure: true});
                        res.cookie("accessToken", body.data);
                    }
                    return res.status(response.statusCode).json(body);
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
        });
    return;
};
