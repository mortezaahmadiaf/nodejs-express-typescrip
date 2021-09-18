"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endPoint = void 0;
const express_1 = require("express");
const validator_1 = require("../validator");
const middleware_1 = require("../../middleware");
const notificationController_1 = require("../../controllers/notificationController");
class EndPoint {
    constructor() {
        this.preRoute = '/notifications';
        this.controller = new notificationController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, validator_1.accept, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/seen').post(middleware_1.jwtCheck, validator_1.idCheck, middleware_1.validation, (request, response, next) => {
            this.seen(request, response, next);
        });
        this.router.route('/accepted/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.accepted(request, response, next);
        });
        this.router.route('/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.findUserAll(request, response, next);
        });
    }
    add(request, response, next) {
        this.controller.acceptedPersonToJob(request, response);
    }
    seen(request, response, next) {
        this.controller.checkNotificationSee(request, response);
    }
    accepted(request, response, next) {
        this.controller.acceptedToJob(request, response);
    }
    findUserAll(request, response, next) {
        this.controller.userAllNotification(request, response);
    }
}
const endPoint = new EndPoint().router;
exports.endPoint = endPoint;
