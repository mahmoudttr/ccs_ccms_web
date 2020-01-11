const yup = require('yup');
const api = require('../helpers/apiResponse');

const rules = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required()
});

const validate = (req, res, next) => {
    const valid = rules.validate(req.body, {abortEarly: false})
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
        /*.then(() => {
            next();
        });*/
};


module.exports = {
    validate
};
