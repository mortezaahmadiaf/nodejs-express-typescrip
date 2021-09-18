"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
class RatingManager {
    constructor() {
        this.rate = new model_1.RationModel();
    }
    ratingToPoster(info) {
        return new Promise((resolve, reject) => {
            let toPoster = new schema_1.Rating({ ...info, to: 'poster' }).getJson();
            this.rate.findRatinByJobIdAndTo({ to: 'poster', jobId: toPoster.jobId }, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: 'Database Error' })
                    : res
                        ? reject({ error: "", errorMsg: 'You rating befor !' })
                        : this.rate.saveRating(toPoster, (er1, res1) => {
                            er1
                                ? reject({ error: er1, errorMsg: 'Database Error' })
                                : res1 ? resolve('Rating Done !') :
                                    reject({ error: "", errorMsg: 'Something went wrong !' });
                        });
            });
        });
    }
    ratingToWorker(info) {
        return new Promise((resolve, reject) => {
            let toWorker = new schema_1.Rating({ ...info, to: 'worker' }).getJson();
            this.rate.findRatinByJobIdAndTo({ to: 'worker', jobId: toWorker.jobId }, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: 'Database Error' })
                    : res
                        ? reject({ error: "", errorMsg: 'You rating befor !' })
                        : this.rate.saveRating(toWorker, (er1, res1) => {
                            er1
                                ? reject({ error: er1, errorMsg: 'Database Error' })
                                : res1 ? resolve('Rating Done !')
                                    : reject({ error: "", errorMsg: 'Something went wrong !' });
                        });
            });
        });
    }
    asPosterRating(posterId) {
        return new Promise((resolve, reject) => {
            this.rate.findRatingByPosterId(posterId, (er, res) => {
                if (er)
                    reject({ error: er, errorMsg: 'Database Error' });
                else if (res.length === 0)
                    resolve(0);
                else {
                    let rate = 0;
                    for (let i = 0; i < res.length; i++)
                        rate = rate + res[i].rate;
                    resolve(rate / res.length);
                }
            });
        });
    }
    asWorkerRating(workerId) {
        return new Promise((resolve, reject) => {
            this.rate.findRatingByWorkerId(workerId, (er, res) => {
                if (er)
                    reject({ error: er, errorMsg: 'Database Error' });
                else if (res.length === 0)
                    resolve(0);
                else {
                    let rate = 0;
                    for (let i = 0; i < res.length; i++)
                        rate = rate + res[i].rate;
                    resolve(rate / res.length);
                }
            });
        });
    }
}
exports.RatingManager = RatingManager;
