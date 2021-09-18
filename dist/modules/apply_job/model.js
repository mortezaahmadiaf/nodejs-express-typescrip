"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJobModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
class ApplyJobModel {
    async saveApply(params, callback) {
        try {
            let result = await mongoDbHelper_1.default.apply.insertOne(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateApplySelectToTrue(params, callback) {
        try {
            let result = await mongoDbHelper_1.default.apply.findOneAndUpdate({ userId: params.userId, jobId: params.jobId }, { $set: { selected: true } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findApplyByJobId(jobId, callback) {
        try {
            let result = await mongoDbHelper_1.default.apply
                .find({ jobId })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findApplyByJobIdAndUserId(params, callback) {
        try {
            let result = await mongoDbHelper_1.default.apply.findOne(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findApplyedByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.apply
                .find({ userId })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.ApplyJobModel = ApplyJobModel;
