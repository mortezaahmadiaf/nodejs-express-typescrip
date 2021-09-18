"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RationModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
const mongodb_1 = require("mongodb");
class RationModel {
    async saveRating(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.rating.insertOne({ ...info });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneRatingById(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.rating.findOne({ _id: new mongodb_1.ObjectId(_id) });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findRatingByWorkerId(workerId, callback) {
        try {
            let result = await mongoDbHelper_1.default.rating.find({ workerId, to: 'worker' }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findRatingByPosterId(posterId, callback) {
        try {
            let result = await mongoDbHelper_1.default.rating.find({ posterId, to: 'poster' }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findRatinByJobIdAndTo(rate, callback) {
        try {
            let result = await mongoDbHelper_1.default.rating.findOne({ ...rate });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.RationModel = RationModel;
