"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/users/manager");
const script_1 = require("../script");
class User {
    constructor() {
        this.user = new manager_1.UserManager();
    }
    add(req, response, next) {
        script_1.sendResult({ response, message: { test: "User add" } });
    }
    update(req, response, next) {
        script_1.sendResult({ response, message: { test: "User update" } });
    }
    delete(req, response, next) {
        script_1.sendResult({ response, message: { test: "User delete" } });
    }
    findOne(req, response, next) {
        script_1.sendResult({ response, message: { test: "User findOne" } });
    }
    findAll(req, response, next) {
        script_1.sendResult({ response, message: { test: "User findAll" } });
    }
}
exports.default = User;
