"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appVersion = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const appVersionController_1 = require("../../controllers/appVersionController");
class AppVersion {
    constructor() {
        this.controller = new appVersionController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, middleware_1.checkVersionPermission, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/').get(middleware_1.jwtCheck, (request, response, next) => {
            this.find(request, response, next);
        });
        this.router.route('app/').get(middleware_1.jwtCheck, middleware_1.checkVersionPermission, this.app);
    }
    find(request, response, next) {
        this.controller.getAppVersion(request, response);
    }
    update(request, response, next) {
        this.controller.updateAppVersion(request, response);
    }
    app(request, response, next) {
        this.controller.getAppVersion(request, response);
    }
}
const appVersion = new AppVersion().router;
exports.appVersion = appVersion;
