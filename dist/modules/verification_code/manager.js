"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
class VerificationCodeManager {
    constructor() {
        this.vrifi = new model_1.VerificationCodeModel();
    }
    addVerificationCode(info) {
        return new Promise((resolve, reject) => {
            let vrifi = new schema_1.VerificationCode(info).getJson();
            this.vrifi.saveVerificationCode(vrifi, (er, res) => {
                er ?
                    reject({ error: er, errroMsg: 'Database Error' }) :
                    !res.result ?
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' }) :
                        resolve(res);
            });
        });
    }
    checkCode(code) {
        return new Promise((resolve, reject) => {
            this.vrifi.checkVerificationCode(code, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'Invalid code' });
            });
        });
    }
}
exports.VerificationCodeManager = VerificationCodeManager;
