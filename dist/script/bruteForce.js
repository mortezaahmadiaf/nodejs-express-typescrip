"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalBruteforce = exports.userBruteforce = void 0;
Promise.resolve().then(() => require('connect-flash'));
const ExpressBrute = require("express-brute");
const moment = require('moment');
var MongoStore = require('express-brute-mongo');
var MongoClient = require('mongodb').MongoClient;
const store = new MongoStore(function (ready) {
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, MC) {
        if (err)
            throw err;
        ready(MC.db('test').collection('bruteforce-store'));
    });
});
const failCallback = function (req, res, next, nextValidRequestDate) {
    console.log({ nextValidRequestDate });
    res.status(423).send({
        'error': "You've made too many failed attempts in a short period of time, please try again " +
            moment(nextValidRequestDate).fromNow()
    });
};
const handleStoreError = function (error) {
    console.error({ error });
    throw {
        message: error.message,
        parent: error.parent
    };
};
exports.userBruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000,
    maxWait: 60 * 60 * 1000,
    failCallback: failCallback,
    handleStoreError: handleStoreError
});
exports.globalBruteforce = new ExpressBrute(store, {
    freeRetries: 10,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25 * 60 * 60 * 1000,
    maxWait: 25 * 60 * 60 * 1000,
    lifetime: 24 * 60 * 60,
    failCallback: failCallback,
    handleStoreError: handleStoreError
});
