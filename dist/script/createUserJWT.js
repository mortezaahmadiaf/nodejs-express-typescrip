"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserJWT = void 0;
const jwt = require("jsonwebtoken");
const createUserJWT = (userInfo) => {
    let token = jwt.sign({
        ...userInfo
    }, process.env.JWT_TOKEN_SECURE_STRING, {
        algorithm: 'HS384',
        expiresIn: `${process.env.JWT_VALIDITY_DAY}d`,
        issuer: 'real_estate'
    });
    return token;
};
exports.createUserJWT = createUserJWT;
