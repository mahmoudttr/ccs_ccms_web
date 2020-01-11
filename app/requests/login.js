const yup = require('yup');
// custom messages
/*import { setLocale } from 'yup';
setLocale({
    mixed: {
        default: 'Não é válido',
    },
    number: {
        min: 'Deve ser maior que ${min}',
    },
});*/

let schema = yup.object().shape({
    username: yup.string().min(10).required(),
    password: yup.string().min(5).required()
});

exports.schema;
