"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const express_1 = require("express");
const jwt_1 = require("../../middleware/jwt");
const stripeAccountController_1 = require("../../controllers/stripeAccountController");
const validation_1 = require("../../middleware/validation");
const validator_1 = require("../validator");
class StripeConnectedAccount {
    constructor() {
        this.stripe = new stripeAccountController_1.StripeAccountController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/complete-account').post(jwt_1.default, (request, response, next) => {
            this.complete(request, response, next);
        });
        this.router.route('/account-complete/:userId').get(jwt_1.default, validator_1.userId, validation_1.default, (request, response, next) => {
            this.afterComplete(request, response, next);
        });
        this.router.route('/bank-account').post(jwt_1.default, (request, response, next) => {
            this.bankAccount(request, response, next);
        });
        this.router.route('/check-account').post(jwt_1.default, (request, response, next) => {
            this.checkAccount(request, response, next);
        });
        this.router.route('/connected-account/reject').post(jwt_1.default, (request, response, next) => {
            this.reject(request, response, next);
        });
        this.router.route('/connected-account/delete').post(jwt_1.default, (request, response, next) => {
            this.delete(request, response, next);
        });
        this.router.route('/account-link/:userId').get(jwt_1.default, validator_1.userId, validation_1.default, (request, response, next) => {
            this.accountLink(request, response, next);
        });
        this.router.route('/connected-account/all').get(jwt_1.default, (request, response, next) => {
            this.findAll(request, response, next);
        });
        this.router.route('/step1').post((request, response, next) => {
            this.step1(request, response, next);
        });
        this.router.route('/step2').post((request, response, next) => {
            this.step2(request, response, next);
        });
        this.router.route('/step3').post((request, response, next) => {
            this.step3(request, response, next);
        });
        this.router.route('/step4').post((request, response, next) => {
            this.step4(request, response, next);
        });
    }
    complete(request, response, next) { this.stripe.completeAccount(request, response); }
    afterComplete(request, response, next) { this.stripe.completeAccount(request, response); }
    bankAccount(request, response, next) { this.stripe.userBankAccount(request, response); }
    checkAccount(request, response, next) { this.stripe.checkAccount(request, response); }
    reject(request, response, next) {
        this.stripe.checkAccount(request, response);
    }
    delete(request, response, next) { this.stripe.checkAccount(request, response); }
    accountLink(request, response, next) { this.stripe.accountLink(request, response); }
    findAll(request, response, next) { this.stripe.allConnectedAccount(request, response); }
    step1(request, response, next) { this.stripe.step1(request, response); }
    step2(request, response, next) { this.stripe.step2(request, response); }
    step3(request, response, next) { this.stripe.step3(request, response); }
    step4(request, response, next) { this.stripe.step4(request, response); }
}
const stripe = new StripeConnectedAccount().router;
exports.stripe = stripe;
