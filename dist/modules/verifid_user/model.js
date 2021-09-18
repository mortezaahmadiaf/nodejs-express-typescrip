"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationUserModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
class VerificationUserModel {
    async saveVerificationUser(info, callback) {
        try {
            await mongoDbHelper_1.default.verifiedUser.createIndex({ expireDate: 1 }, { expireAfterSeconds: 300 });
            let result = await mongoDbHelper_1.default.verifiedUser.insertOne(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async checkVerificationUser(code, callback) {
        try {
            let result = await mongoDbHelper_1.default.verifiedUser.findOne({ code: { $eq: code } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.VerificationUserModel = VerificationUserModel;
