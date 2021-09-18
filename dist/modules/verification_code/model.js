"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCodeModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
class VerificationCodeModel {
    async saveVerificationCode(info, callback) {
        try {
            await mongoDbHelper_1.default.verificationCode.createIndex({ expireDate: 1 }, { expireAfterSeconds: 180 });
            let result = await mongoDbHelper_1.default.verificationCode.insertOne(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async checkVerificationCode(code, callback) {
        try {
            let result = await mongoDbHelper_1.default.verificationCode.findOne({ code });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.VerificationCodeModel = VerificationCodeModel;
