"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const express_1 = require("express");
const paymentController_1 = require("../../controllers/paymentController");
const validator_1 = require("../validator");
const middleware_1 = require("../../middleware");
class Payment {
    constructor() {
        this.payment = new paymentController_1.PaymentController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/done').post(middleware_1.jwtCheck, validator_1.donePayment, middleware_1.validation, (request, response, next) => {
            this.done(request, response, next);
        });
        this.router.route('/intent/:jobId').get(middleware_1.jwtCheck, validator_1.jobId, middleware_1.validation, (request, response, next) => {
            this.intent(request, response, next);
        });
    }
    done(request, response, next) { this.payment.donePayment(request, response); }
    intent(request, response, next) { this.payment.createPaymentIntent(request, response); }
}
const payment = new Payment().router;
exports.payment = payment;
