"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("../script");
class PingController {
    add(req, response, next) { script_1.sendResult({ response, message: { test: "add" } }); }
    update(req, response, next) { script_1.sendResult({ response, message: { test: "update" } }); }
    delete(req, response, next) { script_1.sendResult({ response, message: { test: "delete" } }); }
    findOne(req, response, next) { script_1.sendResult({ response, message: { test: "findOne" } }); }
    findAll(req, response, next) { script_1.sendResult({ response, message: { test: "findAll" } }); }
}
exports.default = PingController;
