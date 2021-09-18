"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/todo/manager");
const script_1 = require("../script");
class ToDo {
    constructor() {
        this.todo = new manager_1.ToDoManager();
    }
    add(req, response, next) {
        script_1.sendResult({ response, message: { test: "todo add" } });
    }
    update(req, response, next) {
        script_1.sendResult({ response, message: { test: "todo update" } });
    }
    delete(req, response, next) {
        script_1.sendResult({ response, message: { test: "todo delete" } });
    }
    findOne(req, response, next) {
        script_1.sendResult({ response, message: { test: "todo findOne" } });
    }
    findAll(req, response, next) {
        script_1.sendResult({ response, message: { test: "todo findAll" } });
    }
}
exports.default = ToDo;
