"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor(info) {
        this.jobId = info.jobId;
        this.userId = info.userId;
        this._id = info._id;
        this.seen = false;
        this.title = info.title;
        this.text = info.text;
    }
    getJson() {
        return {
            _id: this._id,
            jobId: this.jobId,
            userId: this.userId,
            seen: this.seen,
            text: this.text,
            title: this.title
        };
    }
}
exports.Notification = Notification;
