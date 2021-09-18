"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyJob = void 0;
class ApplyJob {
    constructor(info) {
        this.deviceToken = info.deviceToken;
        this.jobId = info.jobId;
        this.selected = false;
        this.userId = info.userId;
        this._id = info._id;
    }
    getJson() {
        return {
            _id: this._id,
            userId: this.userId,
            jobId: this.jobId,
            selected: this.selected,
            deviceToken: this.deviceToken
        };
    }
}
exports.ApplyJob = ApplyJob;
