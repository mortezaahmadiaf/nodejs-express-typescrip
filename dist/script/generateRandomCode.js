"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codeGenerator = () => {
    let code = Math.round(Math.random() * (9990 - 1000) + 1000);
    return code;
};
exports.default = codeGenerator;
