const path = require('path');

exports.index = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/chatOneUser/index.html'));
    }
};



exports._index = (req, res) => {
    const token = req.cookies.accessToken || '';
    if (!token) {
        res.redirect('/login');
    } else {
        return res.sendFile(path.join(__dirname + './../../views/chat/index.html'));
    }
};

