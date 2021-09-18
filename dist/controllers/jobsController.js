"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/jobs/manager");
const script_1 = require("../script");
const manager_2 = require("../modules/apply_job/manager");
const manager_3 = require("../modules/job_category/manager");
const manager_4 = require("../modules/rating/manager");
const manager_5 = require("../modules/notifications/manager");
const mongodb_1 = require("mongodb");
const manager_6 = require("../modules/users/manager");
class Job {
    constructor() {
        this.job = new manager_1.JobManager();
        this.apply = new manager_2.ApplyJobManager();
        this.jobCatrgory = new manager_3.JobCategoryManager();
        this.rating = new manager_4.RatingManager();
        this.notification = new manager_5.NotificationManager();
        this.user = new manager_6.UserManager();
    }
    insertJob(request, response) {
        let job = request.body;
        this.job.insertJob(job)
            .then(() => { script_1.sendResult({ response, message: `Job ${job.title} Posted :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    updateJob(request, response) {
        let job = request.body;
        let { _id } = request.body;
        this.job.updateJob(_id, job)
            .then(() => { script_1.sendResult({ response, message: `Job ${job.title} updated :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    applyJob(request, response) {
        let { userId, jobId, deviceToken, jobDeviceToken, jobTitle, } = request.body;
        this.apply.applyJob({ userId, jobId, deviceToken })
            .then((res) => {
            res &&
                script_1.oneToOneNotification({ deviceToken: jobDeviceToken, text: ` apply for ${jobTitle}`, title: 'Apply' });
            script_1.sendResult({ response, message: { message: 'You are applied successfully :)', result: true } });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    filter(request, response) {
        let { param } = request.body;
        this.job.filterJobByCode(param)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    jobsCategory(request, response) {
        let job = request.body;
        this.jobCatrgory.insertJob(job)
            .then(() => { script_1.sendResult({ response, message: `Job ${job.name} added to category :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    updateJobsCategory(request, response) {
        let job = request.body;
        this.jobCatrgory.updateJob(job)
            .then(() => { script_1.sendResult({ response, message: `Job ${job.name} updated :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    ratingToJobPoster(request, response) {
        let rate = request.body;
        this.rating.ratingToPoster(rate)
            .then((res) => {
            this.job.rate(new mongodb_1.ObjectId(rate.jobId))
                .then(() => { script_1.sendResult({ response, message: 'Rating Done ' }); })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    ratingToWorker(request, response) {
        let rate = request.body;
        this.job.doneJobByJobId(new mongodb_1.ObjectId(rate.jobId))
            .then((res) => {
            this.rating.ratingToWorker(rate)
                .then(() => { script_1.sendResult({ response, message: 'Rating Done ' }); })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    finishedJobWithJobPoster(request, response) {
        let info = request.body;
        this.job.finfishJob(info)
            .then(() => { script_1.sendResult({ response, message: `Job status cganged to ${info.status} :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getUserAccepted(request, response) {
        let { jobId } = request.params;
        this.notification.findNotificationByJobId(jobId)
            .then((not) => {
            this.user.findUserById(not.userId)
                .then((resu) => { script_1.sendResult({ response, message: resu }); })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getUserRate(request, response) {
        let { userId } = request.params;
        this.rating.asPosterRating(userId)
            .then((poster) => {
            this.rating.asWorkerRating(userId)
                .then((worker) => { script_1.sendResult({ response, message: { poster, worker } }); })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getUserJob(request, response) {
        let { userId } = request.params;
        this.job.findAllJobsByUserId(userId)
            .then((userJobs) => {
            this.user.findUserById(userId)
                .then((user) => {
                let temp = userJobs.map((item) => {
                    return { ...item, user };
                });
                script_1.sendResult({ response, message: temp });
            })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getJobByLocation(request, response) {
        let { locationId } = request.params;
        this.job.findJobsByLocationId(parseInt(locationId))
            .then((jobs) => {
            if (jobs.length === 0)
                script_1.sendResult({ response, message: [] });
            else {
                let userIds = jobs.map((job) => job.userId);
                this.user.findUsersByIds(userIds)
                    .then((users) => {
                    if (users.length === 0)
                        script_1.sendResult({ response, message: [] });
                    else {
                        let jobsWithUser = script_1.combineUsersAndJobs(users, jobs);
                        script_1.sendResult({ response, message: jobsWithUser });
                    }
                })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getJobByCityName(request, response) {
        let { cityName } = request.params;
        this.job.findJobsByCityName(cityName.toLowerCase())
            .then((jobs) => {
            if (jobs.length === 0)
                script_1.sendResult({ response, message: [] });
            else {
                let userIds = jobs.map((job) => job.userId);
                this.user.findUsersByIds(userIds)
                    .then((users) => {
                    if (users.length === 0)
                        script_1.sendResult({ response, message: [] });
                    else {
                        let jobsWithUser = script_1.combineUsersAndJobs(users, jobs);
                        script_1.sendResult({ response, message: jobsWithUser });
                    }
                })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    allUserapplidThisJob(request, response) {
        let { jobId } = request.params;
        this.apply.findApplyByJobId(jobId)
            .then((res) => {
            if (res.length === 0)
                script_1.sendResult({ response, message: [] });
            else {
                this.user.findUsersByIds(res)
                    .then((users) => { script_1.sendResult({ response, message: users }); })
                    .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
            }
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    jobDetails(request, response) {
        let { jobId } = request.params;
        this.job.findOneJobById(new mongodb_1.ObjectId(jobId))
            .then((job) => {
            this.user.findUserById(job.userId)
                .then((user) => {
                let temp = { ...job, user };
                script_1.sendResult({ response, message: temp });
            }).catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getAllJobs(request, response) {
        this.job.getallJobs()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    jobsToPagination(request, response) {
        let { page, countPerPage } = request.params;
        let some = { limit: parseInt(countPerPage), offset: parseInt(countPerPage) * parseInt(page) };
        this.job.getsomeJobs(some)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    allJobsCategory(request, response) {
        this.jobCatrgory.getAllJobs()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    jobsCategoryToPagination(request, response) {
        let { page, countPerPage } = request.params;
        let some = { limit: parseInt(countPerPage), offset: parseInt(countPerPage) * parseInt(page) };
        this.jobCatrgory.getSomeJobs(some)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    deleteJobCategory(request, response) {
        let { id } = request.body;
        this.jobCatrgory.deleteJob(id)
            .then(() => { script_1.sendResult({ response, message: `job deleted :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    deleteJob(request, response) {
        let { id } = request.body;
        this.job.delete(id)
            .then(() => { script_1.sendResult({ response, message: `Post deleted` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.default = Job;
