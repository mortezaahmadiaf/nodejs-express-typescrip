"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJobManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
class ApplyJobManager {
    constructor() {
        this.apply = new model_1.ApplyJobModel();
    }
    applyJob(params) {
        return new Promise((resolve, reject) => {
            let apply = new schema_1.ApplyJob(params).getJson();
            this.apply.findApplyByJobIdAndUserId({ userId: params.userId, jobId: params.jobId }, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: "Database Error" })
                    : res
                        ? reject({ error: "", errorMsg: "You applid to this job before !" })
                        : this.apply.saveApply(apply, (er1, res1) => {
                            er1
                                ? reject({ error: er1, errorMsg: "Database Error" })
                                : res.insertedCount > 0
                                    ? resolve("You applid successfully")
                                    : reject({ error: "", errorMsg: "something went wrong !" });
                        });
            });
        });
    }
    selectUser(params) {
        return new Promise((resolve, reject) => {
            this.apply.updateApplySelectToTrue(params, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: "Database Error" })
                    : res.value
                        ? resolve(res.value)
                        : reject({ error: "", errorMsg: "SomeThing went wrong !" });
            });
        });
    }
    findApplyByJobId(jobId) {
        return new Promise((resolve, reject) => {
            this.apply.findApplyByJobId(jobId, (er, applies) => {
                if (er)
                    reject({ error: er, errorMsg: "Database Error" });
                else if (applies.length === 0)
                    resolve([]);
                else {
                    let selected = applies.filter((item) => item.selected);
                    let selectedId = selected ? selected.map((item) => item.userId) : [];
                    let ids = applies.map((item) => item.userId);
                    resolve(selected.length ? selectedId : ids);
                }
            });
        });
    }
    getApplyedUser(params) {
        return new Promise((resolve, reject) => {
            this.apply.findApplyByJobIdAndUserId(params, (er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    allUserApplyed(params) {
        return new Promise((resolve, reject) => {
            this.apply.findApplyedByUserId(params, (er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
}
exports.ApplyJobManager = ApplyJobManager;
