"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const sendMessages_1 = require("../script/sendMessages");
const insertOrUpdatePermissionm = (request, response, Next) => {
    const errors = express_validator_1.validationResult(request);
    if (errors.isEmpty()) {
        Next();
    }
    else {
        let extractedErrors = '';
        errors.array().map((err) => { extractedErrors = extractedErrors + ` ${err.msg} ,`; });
        console.error({ extractedErrors });
        sendMessages_1.sendError({ response, message: extractedErrors });
    }
};
exports.default = insertOrUpdatePermissionm;
