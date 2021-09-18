"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieFromLogin = void 0;
const dotenv = require("dotenv");
const superagent = require("superagent");
dotenv.config();
const getCookieFromLogin = async (server) => {
    let response = await superagent.post(`${server}/users/login`)
        .set('X-API-KEY', 'foobar')
        .set('Accept', 'application/json')
        .send({
        userName: process.env.LOGIN_USERNAME,
        password: process.env.LOGIN_PASSWORD
    });
    process.env.TEST_COOKIE = response.headers['set-cookie'];
};
exports.getCookieFromLogin = getCookieFromLogin;
