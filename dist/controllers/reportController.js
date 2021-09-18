"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/users/manager");
const manager_2 = require("../modules/jobs/manager");
const manager_3 = require("../modules/notifications/manager");
const script_1 = require("../script");
const bson_1 = require("bson");
const _ = require("lodash");
class Report {
    constructor() {
        this.notif = new manager_3.NotificationManager();
        this.job = new manager_2.JobManager();
        this.user = new manager_1.UserManager();
    }
    getWeekDaysReport(jobsAndUsers) {
        let week = {};
        let p1 = script_1.reportFunction(jobsAndUsers, 1), p2 = script_1.reportFunction(jobsAndUsers, 2), p3 = script_1.reportFunction(jobsAndUsers, 3), p4 = script_1.reportFunction(jobsAndUsers, 4), p5 = script_1.reportFunction(jobsAndUsers, 5), p6 = script_1.reportFunction(jobsAndUsers, 6), p7 = script_1.reportFunction(jobsAndUsers, 7);
        week[p1['weekDay']] = p1['payment'];
        week[p2['weekDay']] = p2['payment'];
        week[p3['weekDay']] = p3['payment'];
        week[p4['weekDay']] = p4['payment'];
        week[p5['weekDay']] = p5['payment'];
        week[p6['weekDay']] = p6['payment'];
        week[p7['weekDay']] = p7['payment'];
        return week;
    }
    totalPayment(jobs) {
        let paymet = 0;
        jobs.map((item) => {
            paymet = paymet + parseFloat(item.payment);
        });
        return paymet;
    }
    todayPayment(jobs) {
        let paymet = 0;
        let todayJobs = jobs.filter((item) => item.endDate.toString() === script_1.today());
        todayJobs.map((item) => {
            paymet = paymet + parseFloat(item.payment);
        });
        return paymet;
    }
    combineUsersAndJobs(users, jobs) {
        let jobAndUser = jobs.map((job) => {
            for (var i = 0; i < users.length; i++)
                if (users[i]['id'] === job.userId)
                    return { user: users[i], ...job };
        });
        let jobsAndUsers = _.reject(jobAndUser, _.isNull);
        jobsAndUsers = _.reject(jobAndUser, _.isUndefined);
        return jobsAndUsers;
    }
    getUsersId(jobs) {
        let userId = jobs.map(item => item.userId);
        return userId;
    }
    todayReport(request, response) {
        let { userId } = request.params;
        this.notif.findNotificationsByUserId(userId)
            .then((notif) => {
            if (notif.length === 0)
                script_1.sendResult({
                    response,
                    message: { jobs: 0, numJobs: 0, todayJobs: 0, totalPayment: 0, todayPayment: 0, isEmpty: true }
                });
            else {
                let jobIds = notif.map((item) => new bson_1.ObjectId(item.jobId));
                this.job.allJobsDoneByUser(jobIds).then((jobs) => {
                    let totalPayment = this.totalPayment(jobs), todayPayment = this.todayPayment(jobs);
                    let todayJobs = jobs.filter((item) => item.endDate.toString() === script_1.today());
                    let userIds = this.getUsersId(jobs);
                    this.user.findUsersByIds(userIds)
                        .then((users) => {
                        let jobsAndUsers = this.combineUsersAndJobs(users, todayJobs);
                        script_1.sendResult({
                            response,
                            message: {
                                jobs: jobsAndUsers,
                                numJobs: jobs.length,
                                todayJobs: todayJobs.length,
                                totalPayment,
                                todayPayment,
                                isEmpty: jobs ? false : true
                            }
                        });
                    });
                })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    weeklyReport(request, response) {
        let { userId } = request.params;
        this.notif.findNotificationsByUserId(userId)
            .then((notif) => {
            if (notif.length === 0)
                script_1.sendResult({ response, message: { isEmpty: true } });
            else {
                let jobIds = notif.map((item) => new bson_1.ObjectId(item.jobId));
                this.job.getLastWeekJobs(jobIds)
                    .then((jobs) => {
                    let userIds = this.getUsersId(jobs);
                    this.user.findUsersByIds(userIds)
                        .then((users) => {
                        let jobsAndUsers = this.combineUsersAndJobs(users, jobs);
                        let week = this.getWeekDaysReport(jobsAndUsers);
                        script_1.sendResult({
                            response,
                            message: {
                                jobs: jobsAndUsers,
                                weekReport: week,
                                isEmpty: jobsAndUsers ? false : true
                            }
                        });
                    })
                        .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
                })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    customReport(request, response) {
        let { userId, from, to } = request.params;
        this.notif.findNotificationsByUserId(userId)
            .then((notif) => {
            if (notif.length === 0)
                script_1.sendResult({ response, message: { isEmpty: true } });
            else {
                let jobIds = notif.map((item) => new bson_1.ObjectId(item.jobId));
                let date = { _ids: jobIds, endDate: to, startDate: from };
                this.job.getCustomDateJobs(date)
                    .then((jobs) => {
                    let userIds = jobs.map((item) => item.userId);
                    this.user.findUsersByIds(userIds)
                        .then((users) => {
                        let jobsAndUsers = this.combineUsersAndJobs(users, jobs);
                        let totalPayment = this.totalPayment(jobsAndUsers);
                        script_1.sendResult({
                            response,
                            message: {
                                jobs: jobsAndUsers,
                                totalPayment,
                                numJobs: jobsAndUsers.length,
                                isEmpty: jobsAndUsers.length ? false : true
                            }
                        });
                    })
                        .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
                })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.default = Report;
