"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/notifications/manager");
const script_1 = require("../script");
const manager_2 = require("../modules/jobs/manager");
const manager_3 = require("../modules/apply_job/manager");
const manager_4 = require("../modules/users/manager");
const mongodb_1 = require("mongodb");
class Notification {
    constructor() {
        this.notif = new manager_1.NotificationManager();
        this.job = new manager_2.JobManager();
        this.apply = new manager_3.ApplyJobManager();
        this.user = new manager_4.UserManager();
    }
    acceptedPersonToJob(request, response) {
        let { userId, jobId } = request.body;
        this.job.statusToOnProgress({ _id: new mongodb_1.ObjectId(jobId), assignTo: userId })
            .then((job) => {
            this.apply.selectUser({ userId, jobId })
                .then((apply) => {
                const title = job.title;
                const text = `You selected to ${title}`;
                this.notif.saveNotification({ jobId, text, title, userId })
                    .then(() => {
                    script_1.oneToOneNotification({ deviceToken: apply.deviceToken, text, title });
                    script_1.sendResult({
                        response,
                        message: { message: `User Assign to ${title}`, result: true }
                    });
                })
                    .catch((er2) => { script_1.sendError({ response, message: er2 }); });
            }).catch((er1) => { script_1.sendError({ response, message: er1 }); });
        }).catch((er) => { script_1.sendError({ response, message: er }); });
    }
    checkNotificationSee(request, response) {
        let { id } = request.body;
        this.notif.notificationSeenToTrue(id)
            .then(() => { script_1.sendResult({ response, message: { result: true } }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    acceptedToJob(request, response) {
        let { userId } = request.params;
        this.notif.findNotificationsByUserId(userId)
            .then((noti) => {
            if (noti.length === 0)
                script_1.sendResult({ response, message: [] });
            else {
                let jobIds = noti.map((item) => new mongodb_1.ObjectId(item.jobId));
                this.job.findAllJobsByJobIds(jobIds)
                    .then((jobs) => {
                    if (jobs.length === 0)
                        script_1.sendResult({ response, message: [] });
                    else {
                        let userIds = jobs.map((item) => item.userId);
                        this.user.findUsersByIds(userIds)
                            .then((users) => {
                            if (users.length === 0)
                                script_1.sendResult({ response, message: [] });
                            else {
                                let jobAndUser = script_1.combineUsersAndJobs(users, jobs);
                                script_1.sendResult({ response, message: jobAndUser });
                            }
                        })
                            .catch((er2) => { script_1.sendError({ response, message: er2 }); });
                    }
                }).catch((er1) => {
                    script_1.sendError({ response, message: er1 });
                });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    userAllNotification(request, response) {
        let { userId } = request.params;
        this.notif.findNotificationsByUserId(userId)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
}
exports.default = Notification;
