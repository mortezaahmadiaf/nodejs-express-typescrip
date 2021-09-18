"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const script_1 = require("../script");
const manager_1 = require("../modules/stripeAccount/manager");
const manager_2 = require("../modules/jobs/manager");
const mongodb_1 = require("mongodb");
const manager_3 = require("../modules/payment/manager");
class PaymentController {
    constructor() {
        this.connectedAccount = new manager_1.StripeAccountManager();
        this.job = new manager_2.JobManager();
        this.payment = new manager_3.PymentManager();
    }
    donePayment(request, response) {
        let pay = request.body;
        this.job.donePaymnet(pay)
            .then((res) => { script_1.sendResult({ response, message: { result: true, message: res } }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    createPaymentIntent(request, response) {
        let { jobId } = request.params;
        this.job.findOneJobById(new mongodb_1.ObjectId(jobId))
            .then((job) => {
            this.connectedAccount.findAccount(job.assignTo)
                .then((res) => {
                this.payment.createPayment({
                    amount: parseFloat(job.payment), jobId,
                    destination: res.accountId,
                    description: job.title + job.description,
                }).then((res) => {
                    res['client_secret']
                        ? script_1.sendResult({ response, message: res['client_secret'], })
                        : script_1.sendError({
                            response, message: "the person you want to pay for , has not complete their account",
                        });
                })
                    .catch((er2) => { script_1.sendError({ response, message: er2 }); });
            }).catch((er1) => { script_1.sendError({ response, message: er1 }); });
        }).catch((er) => { script_1.sendError({ response, message: er }); });
    }
}
exports.PaymentController = PaymentController;
