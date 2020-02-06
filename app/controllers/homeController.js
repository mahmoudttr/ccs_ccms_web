const path = require('path');

// Define your app route handlers and business logic
exports.index = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/index.html'));
    }
};
