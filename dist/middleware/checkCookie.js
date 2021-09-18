"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenInCoockie = void 0;
const jwt = require("jsonwebtoken");
const script_1 = require("script");
const verifyTokenInCoockie = async (request, response, next) => {
    const token = request.cookies.token || undefined;
    try {
        if (!token)
            script_1.sendError({ response, message: 'login require', status: 401 });
        let decrypt = await jwt.verify(token, process.env.JWT_TOKEN_SECURE_STRING);
        request['STUser'] = {
            id: decrypt['id']
        };
        next();
    }
    catch (error) {
        console.log('error');
        script_1.sendError({ response, message: 'somethink went wrongd' });
    }
};
exports.verifyTokenInCoockie = verifyTokenInCoockie;
