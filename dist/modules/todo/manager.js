"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoManager = void 0;
const bson_1 = require("bson");
const model_1 = require("./model");
const schema_1 = require("./schema");
class ToDoManager {
    constructor() {
        this.todo = new model_1.ToDoModel();
    }
    insertJob(params) {
        return new Promise((resolve, reject) => {
            let job = new schema_1.ToDo(params).getJson();
            this.todo.saveJob(job, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res.insertedCount === 1 ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' });
            });
        });
    }
    updateJob(_id, params) {
        return new Promise((resolve, reject) => {
            let job = new schema_1.ToDo(params);
            let updateJob = job.getJson();
            this.todo.updateJob(_id, updateJob, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' })
                    : res.value
                        ? resolve('Job updated !')
                        : reject({ error: "", errorMsg: 'Job not updated' });
            });
        });
    }
    delete(_id) {
        return new Promise((resolve, reject) => {
            this.todo.deleteJobById(new bson_1.ObjectId(_id), (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.ToDoManager = ToDoManager;
