import('connect-flash')
import ExpressBrute = require('express-brute')
// const MemcachedStore = require('express-brute-memcached')
const moment = require('moment')
var MongoStore = require('express-brute-mongo');
var MongoClient = require('mongodb').MongoClient;
const store = new MongoStore(function (ready) {
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, MC) {
        if (err) throw err;
        ready(MC.db('test').collection('bruteforce-store'));
    });
});
const failCallback = function (req, res, next, nextValidRequestDate) {
    res.status(423).send({
        'error':
            "You've made too many failed attempts in a short period of time, please try again " +
            moment(nextValidRequestDate).fromNow()
    });

}
const handleStoreError = function (error) {
    console.error({ error }); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
}
export const userBruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
    failCallback: failCallback,
    handleStoreError: handleStoreError
})

export const globalBruteforce = new ExpressBrute(store, {
    freeRetries: 10,
    attachResetToRequest: false,
    refreshTimeoutOnRequest: false,
    minWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    maxWait: 25 * 60 * 60 * 1000, // 1 day 1 hour (should never reach this wait time)
    lifetime: 24 * 60 * 60, // 1 day (seconds not milliseconds)
    failCallback: failCallback,
    handleStoreError: handleStoreError
});
// const store = new Brute.MemoryStore()
// export const bruteForce = new Brute(store, { freeRetries: 2, minWait: 10000 })