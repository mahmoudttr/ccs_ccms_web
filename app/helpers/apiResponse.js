const Status = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    VALIDATION_FAILED: 422,
    SERVER_ERROR: 500
};

function statusMessage(code = null, message = null) {
    switch (code) {
        case Status.OK:
            return !message ? 'OK' : message;
        case Status.CREATED:
            return !message ? 'Created' : message;
        case Status.BAD_REQUEST:
            return !message ? 'Bad Request' : message;
        case Status.UNAUTHORIZED:
            return !message ? 'Unauthorized' : message;
        case Status.FORBIDDEN:
            return !message ? 'Forbidden' : message;
        case Status.NOT_FOUND:
            return !message ? 'Not Found' : message;
        case Status.UNSUPPORTED_ACTION:
            return !message ? 'Unsupported Action' : message;
        case Status.VALIDATION_FAILED:
            return !message ? 'Validation Failed' : message;
        case Status.SERVER_ERROR:
            return !message ? 'Internal Server Error' : message;
        default :
            return message;
    }
}

function successCode(statusCode) {
    switch (statusCode) {
        case Status.OK:
            return 1;
        case Status.CREATED:
            return 1;
        case Status.ACCEPTED:
            return 1;
        case Status.NO_CONTENT:
            return 1;
        default :
            return 0;
    }
}

function isSuccess(statusCode = 200) {
    return successCode(statusCode);
}

function errors(errors) {
    return errors;
}

function data(data = 'data') {
    return data;
}

function jsonFormat(body) {
    return {
        result: isSuccess(body.code),
        message: statusMessage(body.code, body.message),
        errors: errors(body.errors),
        data: data(body.data)
    };
}

exports.response = function (res, body) {
    console.log('api response....');
    res.status(body.code).json(jsonFormat(body));
    res.end();
};
