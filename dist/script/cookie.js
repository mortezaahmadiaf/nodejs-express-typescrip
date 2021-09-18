"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenSetCookie = void 0;
const jwt = require("jsonwebtoken");
const generateTokenSetCookie = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_TOKEN_SECURE_STRING, {
        algorithm: 'HS384',
        expiresIn: `${process.env.JWT_VALIDITY_DAY}d`,
        issuer: 'real_estate'
    });
    return res.cookie('token', token, {
        expires: new Date(new Date().setDate(new Date().getDate() + parseInt(process.env.JWT_VALIDITY_DAY))),
        httpOnly: true,
    });
};
exports.generateTokenSetCookie = generateTokenSetCookie;
