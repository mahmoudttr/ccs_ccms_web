const LocalStorage = require('node-localstorage').LocalStorage;


function newObjectLocalStorage() {
    return new LocalStorage('./localStorage');
}

/*exports.store = function (token) {
    // we use specific key for storing access token


    this.localStorage.setItem('accessToken', JSON.stringify(token));
};*/

/*TokenStorage.prototype.get = function () {
// we get access token back by using specific key
    return this.localStorage.getItem('accessToken');
};*/

/*
TokenStorage.prototype.remove = function () {
    return this.localStorage.removeItem('accessToken');
};
*/


var nodeLocalStorage = {
    store: function (key, value) {
        return newObjectLocalStorage().setItem(key, value);
    },
    get: function (key) {
        return newObjectLocalStorage().getItem(key);
    },
    remove: function (key) {
        return newObjectLocalStorage().removeItem(key);
    }
};

module.exports = nodeLocalStorage;

