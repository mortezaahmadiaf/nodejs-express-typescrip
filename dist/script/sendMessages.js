"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResult = exports.sendError = void 0;
const sendError = ({ response, message, status = 400 }) => {
    response.status(status).send({ error: message, result: false });
};
exports.sendError = sendError;
const sendResult = ({ response, message }) => {
    response.status(200).send(message);
};
exports.sendResult = sendResult;
