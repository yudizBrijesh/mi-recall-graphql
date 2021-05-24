const _ = {};
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const crypto = require('crypto');

_.encodeToken = function (body, expTime) {
    try {
        return expTime ? jwt.sign(body, process.env.JWT_SECRET, expTime) : jwt.sign(body, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

_.mongify = function (id) {
    return mongoose.Types.ObjectId(id);
};

_.encryptPassword = function (password) {
    return crypto.createHmac('sha256', process.env.JWT_SECRET).update(password).digest('hex');
};

_.verifyToken = function (token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            return err ? err.message : decoded; // return true if token expired
        });
    } catch (error) {
        return error ? error.message : error;
    }
};

_.decodeToken = function (token) {
    try {
        return jwt.decode(token, process.env.JWT_SECRET);
    } catch (error) {
        return undefined;
    }
};

module.exports = _;
