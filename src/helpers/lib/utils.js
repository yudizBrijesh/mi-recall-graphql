const _ = {};
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

_.encodeToken = function (body, expTime) {
    try {
        return expTime ? jwt.sign(body, process.env.JWT_SECRET, expTime) : jwt.sign(body, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

_.encryptPassword = function (password) {
    return crypto.createHmac('sha256', process.env.JWT_SECRET).update(password).digest('hex');
};

_.decodeToken = function (token) {
    try {
        return jwt.decode(token, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

module.exports = _;
