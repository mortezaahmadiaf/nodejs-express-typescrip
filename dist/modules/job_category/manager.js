"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCategoryManager = void 0;
const model_1 = require("./model");
class JobCategoryManager {
    constructor() {
        this.jobCatrgory = new model_1.JobCategoryModel();
    }
    insertJob(job) {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.findJobCategoryByName(job.name, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        reject({ error: "", errorMsg: 'This job exist' }) :
                        this.jobCatrgory.saveJobCategory(job, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: 'Database Error' }) :
                                resolve(res1);
                        });
            });
        });
    }
    updateJob(job) {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.findJobCategoryById(job.id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        this.jobCatrgory.updateJobCategory(job, (er1, res1) => {
                            er1 ?
                                reject({ errro: er1, errorMsg: 'Database Error' }) :
                                resolve(res1);
                        }) :
                        reject({ error: "", errorMsg: 'Job Not Found' });
            });
        });
    }
    deleteJob(id) {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.deleteJobCategory(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getAllJobs() {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.allJobsCategory((er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getSomeJobs(info) {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.limiteJobCategory(info, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getJobById(id) {
        return new Promise((resolve, reject) => {
            this.jobCatrgory.findJobCategoryById(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.JobCategoryManager = JobCategoryManager;
