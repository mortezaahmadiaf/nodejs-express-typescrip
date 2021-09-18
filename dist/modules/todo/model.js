"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
const mongodb_1 = require("mongodb");
class ToDoModel {
    async saveJob(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.toDo.insertOne(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateJob(id, info, callback) {
        let _id = new mongodb_1.ObjectId(id);
        try {
            let result = await mongoDbHelper_1.default.toDo.findOneAndUpdate({ _id }, { $set: info });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deleteJobById(_id, callback) {
        try {
            let result = mongoDbHelper_1.default.toDo.deleteOne({ _id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.ToDoModel = ToDoModel;
