const path = require('path');

// Define your app route handlers and business logic
exports.index = (req, res) => {
    return res.sendFile(path.join(__dirname + './../../views/index.html'));
};
