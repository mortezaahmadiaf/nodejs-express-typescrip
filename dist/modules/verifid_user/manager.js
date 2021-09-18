"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationUserManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
class VerificationUserManager {
    constructor() {
        this.vrifi = new model_1.VerificationUserModel();
    }
    addVerificationUser(info) {
        return new Promise((resolve, reject) => {
            let vrifi = new schema_1.VerificationUser(info).getJson();
            this.vrifi.saveVerificationUser(vrifi, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res.result ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong' });
            });
        });
    }
    checkVerificationUser(code) {
        return new Promise((resolve, reject) => {
            this.vrifi.checkVerificationUser(code, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: er, errorMsg: 'Invalid code' });
            });
        });
    }
}
exports.VerificationUserManager = VerificationUserManager;
