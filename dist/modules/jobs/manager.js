"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobManager = void 0;
const bson_1 = require("bson");
const model_1 = require("./model");
const schema_1 = require("./schema");
class JobManager {
    constructor() {
        this.job = new model_1.JobModel();
    }
    insertJob(params) {
        return new Promise((resolve, reject) => {
            let job = new schema_1.Job(params).getJson();
            this.job.saveJob(job, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res.insertedCount === 1 ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' });
            });
        });
    }
    statusToOnProgress(params) {
        return new Promise((resolve, reject) => {
            this.job.changeJobStatusNewToOnProcess(params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res.value ?
                        resolve(res.value) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' });
            });
        });
    }
    updateJob(_id, params) {
        return new Promise((resolve, reject) => {
            let job = new schema_1.UpdateJob(params);
            let updateJob = job.getJson();
            this.job.updateJob(_id, updateJob, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' })
                    : res.value
                        ? resolve('Job updated !')
                        : reject({ error: "", errorMsg: 'Job not updated' });
            });
        });
    }
    filterJobByCode(jobCode) {
        return new Promise((resolve, reject) => {
            this.job.findJobByJobCode(jobCode, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    delete(_id) {
        return new Promise((resolve, reject) => {
            this.job.deleteJobById(new bson_1.ObjectId(_id), (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findJobsByLocationId(locationId) {
        return new Promise((resolve, reject) => {
            this.job.findJobsByLocationId(locationId, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findJobsByCityName(cityName) {
        return new Promise((resolve, reject) => {
            this.job.findJobsByCityName(cityName, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findAllJobsByUserId(userId) {
        return new Promise((resolve, reject) => {
            this.job.findAllJobsByUserId(userId, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findAllJobsByJobIds(jobsIds) {
        return new Promise((resolve, reject) => {
            this.job.findAllJobsByJobId(jobsIds, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getUserFinishedJobs(userId) {
        return new Promise((resolve, reject) => {
            this.job.findUserFinishedJobsByUserId(userId, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getallJobs() {
        return new Promise((resolve, reject) => {
            this.job.allJobs((er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    finfishJob(info) {
        return new Promise((resolve, reject) => {
            this.job.finishedJobByJobId(info, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' })
                    : res.value
                        ? resolve(res)
                        : reject({ error: "", errorMsg: 'SomeThing went wrong !' });
            });
        });
    }
    getsomeJobs(params) {
        return new Promise((resolve, reject) => {
            this.job.limitCountJobs(params, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getTodayDoneJobs(params) {
        return new Promise((resolve, reject) => {
            this.job.findTodayDoneJobsByJobsIds(params, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getLastWeekJobs(params) {
        return new Promise((resolve, reject) => {
            this.job.findLastWeekDoneJobs(params, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getCustomDateJobs(params) {
        return new Promise((resolve, reject) => {
            this.job.findCustomDateDoneJobs(params, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findOneJobById(_id) {
        return new Promise((resolve, reject) => {
            this.job.findOneJobById(_id, (er, job) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    job ? resolve(job) :
                        reject({ error: "", errorMsg: 'Job not exist' });
            });
        });
    }
    getJobsByIds(_id) {
        return new Promise((resolve, reject) => {
            this.job.findJobsByIds(_id, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    rate(_id) {
        return new Promise((resolve, reject) => {
            this.job.updateJobRateToTrue(_id, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: 'Database Error' })
                    : res.value
                        ? resolve('Ok')
                        : reject({ error: "", errorMsg: 'Something went wrong !' });
            });
        });
    }
    allJobsDoneByUser(_ids) {
        return new Promise((resolve, reject) => {
            this.job.findAllDoneJobsByJobIds(_ids, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    doneJobByJobId(_id) {
        return new Promise((resolve, reject) => {
            this.job.checkDoneStatusJobById(_id, (er, job) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    job ?
                        this.job.doneJobById(_id, (er1, res) => {
                            er1 ?
                                reject({ error: er, errorMsg: 'Database Error' }) :
                                resolve(res);
                        }) :
                        reject({ error: "", errorMsg: 'You can`t done this job' });
            });
        });
    }
    donePaymnet(info) {
        return new Promise((resolve, reject) => {
            this.job.endPayment(info, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.JobManager = JobManager;
