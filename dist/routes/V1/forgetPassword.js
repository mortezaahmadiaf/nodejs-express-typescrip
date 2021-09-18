"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = void 0;
const middleware_1 = require("../../middleware");
const express_1 = require("express");
const validator_1 = require("../validator");
const forgotPasswordController_1 = require("../../controllers/forgotPasswordController");
class ForgetPassword {
    constructor() {
        this.controller = new forgotPasswordController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(validator_1.phoneCountryCode, middleware_1.validation, (request, response, next) => {
            this.forgetPassword(request, response, next);
        });
        this.router.route('/verify-phone').post(validator_1.code, middleware_1.validation, (request, response, next) => {
            this.verifyPhone(request, response, next);
        });
        this.router.route('/new-password').post(validator_1.passwordCode, middleware_1.validation, (request, response, next) => {
            this.newPassword(request, response, next);
        });
    }
    forgetPassword(request, response, next) {
        this.controller.verifyPhoneToForgotPassword(request, response);
    }
    verifyPhone(request, response, next) {
        this.controller.verifyOTPCodeToForgotPassword(request, response);
    }
    newPassword(request, response, next) { }
}
const forgetPassword = new ForgetPassword().router;
exports.forgetPassword = forgetPassword;
