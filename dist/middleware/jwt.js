"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const sendMessages_1 = require("../script/sendMessages");
exports.default = (request, response, Next) => {
    const jwtToken = request.header('jwt');
    if (!jwtToken)
        return sendMessages_1.sendError({ response, status: 401, message: 'access denied' });
    else
        try {
            const verified = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECURE_STRING);
            request['STUser'] = verified;
            Next();
        }
        catch (error) {
            sendMessages_1.sendError({ response, message: 'invalid user', status: 401 });
        }
};
