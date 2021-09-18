"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encription = exports.genRandomString = void 0;
const crypto_js_1 = require("crypto-js");
const genRandomString = ({ stringLength }) => {
    return crypto_js_1.lib.WordArray.random(stringLength / 2).toString();
};
exports.genRandomString = genRandomString;
const encription = ({ password, salt }) => {
    let hash = crypto_js_1.PBKDF2(password, salt).toString();
    return hash;
};
exports.encription = encription;
