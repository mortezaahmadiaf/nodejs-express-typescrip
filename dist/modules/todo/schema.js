"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
class ToDo {
    constructor(info) {
        this.userId = info.userId;
        this._id = info._id;
        this.done = false;
        this.toDo = info.toDo;
    }
    getJson() {
        return {
            _id: this._id,
            userId: this.userId,
            done: this.done,
            toDo: this.toDo
        };
    }
}
exports.ToDo = ToDo;
