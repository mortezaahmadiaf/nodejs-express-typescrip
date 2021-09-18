"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.report = void 0;
const express_1 = require("express");
const reportController_1 = require("../../controllers/reportController");
const validator_1 = require("../validator");
const middleware_1 = require("../../middleware");
class Report {
    constructor() {
        this.controller = new reportController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/today/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.today(request, response, next);
        });
        this.router.route('/weekly/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.weekly(request, response, next);
        });
        this.router.route('/custom/:userId/:from/:to').get(middleware_1.jwtCheck, validator_1.customReport, middleware_1.validation, (request, response, next) => {
            this.custom(request, response, next);
        });
    }
    today(request, response, next) { this.controller.todayReport(request, response); }
    weekly(request, response, next) { this.controller.weeklyReport(request, response); }
    custom(request, response, next) { this.controller.customReport(request, response); }
}
const report = new Report().router;
exports.report = report;
