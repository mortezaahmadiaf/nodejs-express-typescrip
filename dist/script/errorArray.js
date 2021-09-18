"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const errorsHandler = (errors) => {
    let error = errors.map((item) => item.message.split('.').lenght > 1 ? item.message.split('.')[1] : item.message);
    return error;
};
exports.errorsHandler = errorsHandler;
