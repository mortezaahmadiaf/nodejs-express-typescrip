"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
const bson_1 = require("bson");
class NotificationModel {
    async findOne(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications.findOne({
                ...info,
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async saveNotification(info, callback) {
        try {
            let result, noti = await mongoDbHelper_1.default.notifications.findOne(info);
            noti
                ? callback({ error: "this notifiaction exist" }, null)
                : (result = await mongoDbHelper_1.default.notifications.insertOne(info));
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findNotificationByJobId(jobId, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications.findOne({ jobId });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findNotificationsByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications
                .find({ userId })
                .sort({ $natural: 1 })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findLast10NotificationsByUserId(userId, callback) {
        try {
            let count = await mongoDbHelper_1.default.notifications.find({ userId }).count();
            let result = await mongoDbHelper_1.default.notifications
                .find({ userId })
                .sort({ $natural: 1 })
                .skip(count === 0 || count < 10 ? 0 : count - 10)
                .limit(10)
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneByUserIdAndJobId(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications.findOne({
                ...info,
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateNotificationSeenToTrue(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications.findOneAndUpdate({ _id: new bson_1.ObjectId(_id) }, { $set: { seen: true } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deleteNotification(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.notifications.deleteOne({
                _id: new bson_1.ObjectId(_id),
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.NotificationModel = NotificationModel;
