const yup = require('yup');
const api = require('../helpers/apiResponse');
const request = require("request");

const rules = yup.object().shape({
    username: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required().email(),
    phone_number_pbx: yup.string(),
    password: yup.string().required()
});

const validate = (req, res, next) => {
    const valid = rules.validate(req.body, {abortEarly: false})
        .then(function (value) {
            request({
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    uri: "http://localhost:3007/api/v1/users",
                    form: req.body,
                }
                , function (error, response, body) {
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
    // return valid;
};

module.exports = {
    validate
};
