"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
class Rating {
    constructor(info) {
        this.workerId = info.workerId;
        this.rate = info.rate;
        this.posterId = info.posterId;
        this.message = info.message;
        this.jobId = info.jobId;
        this._id = info._id,
            this.to = info.to;
    }
    getJson() {
        return {
            jobId: this.jobId,
            message: this.message,
            posterId: this.posterId,
            rate: this.rate,
            workerId: this.workerId,
            _id: this._id,
            to: this.to
        };
    }
}
exports.Rating = Rating;
