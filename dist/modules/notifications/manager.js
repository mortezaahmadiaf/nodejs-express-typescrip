"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
class NotificationManager {
    constructor() {
        this.notification = new model_1.NotificationModel();
    }
    saveNotification(params) {
        return new Promise((resolve, reject) => {
            let not = new schema_1.Notification(params).getJson();
            this.notification.saveNotification(not, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong' });
            });
        });
    }
    findNotificationByJobId(jobId) {
        return new Promise((resolve, reject) => {
            this.notification.findNotificationByJobId(jobId, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong' });
            });
        });
    }
    findNotificationsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.notification.findLast10NotificationsByUserId(userId, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findlast10NotificationsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.notification.findLast10NotificationsByUserId(userId, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getByUserIdAndJobIs(params) {
        return new Promise((resolve, reject) => {
            this.notification.findOne(params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    notificationSeenToTrue(_id) {
        return new Promise((resolve, reject) => {
            this.notification.updateNotificationSeenToTrue(_id, (er, res) => {
                er ?
                    reject({ error: er, errroMsg: 'Database Error' }) :
                    res.value ?
                        resolve(res.value) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' });
            });
        });
    }
}
exports.NotificationManager = NotificationManager;
