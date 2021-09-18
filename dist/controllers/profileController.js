"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/profile/manager");
const script_1 = require("../script");
const manager_2 = require("../modules/users/manager");
class Profile {
    constructor() {
        this.profile = new manager_1.ProfileManager();
        this.user = new manager_2.UserManager();
    }
    add(req, response, next) {
        script_1.sendResult({ response, message: { test: "Profile add" } });
    }
    update(req, response, next) {
        script_1.sendResult({ response, message: { test: "Profile update" } });
    }
    delete(req, response, next) {
        script_1.sendResult({ response, message: { test: "Profile delete" } });
    }
    findOne(req, response, next) {
        script_1.sendResult({ response, message: { test: "Profile findOne" } });
    }
    findAll(req, response, next) {
        script_1.sendResult({ response, message: { test: "Profile findAll" } });
    }
}
exports.default = Profile;
