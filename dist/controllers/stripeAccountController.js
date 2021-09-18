"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeAccountController = void 0;
const script_1 = require("../script");
const manager_1 = require("../modules/stripeAccount/manager");
class StripeAccountController {
    constructor() {
        this.stripe = new manager_1.StripeAccountManager();
    }
    completeAccount(request, response) {
        let { userId } = request.params;
        this.stripe.completeAccount(userId)
            .then(() => {
            script_1.sendResult({
                response,
                message: '<div styles={{paddingTop:"45px",background:"lightgray",width:"100%",height:"100vh"}} >Your account completed</div>',
            });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    accountLink(request, response) {
        const { userId } = request.params;
        this.stripe.createAccountLink(userId)
            .then((accountLink) => { script_1.sendResult({ response, message: accountLink['url'] }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    completeStripeAccount(request, response) {
        script_1.sendResult({ response, message: "complete stripe account" });
    }
    userBankAccount(request, response) {
        script_1.sendResult({ response, message: "user bank account" });
    }
    checkAccount(request, response) {
        let { email, accountId } = request.body;
        this.stripe.checkStripeAccountWithEmail(email, accountId)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    allConnectedAccount(request, response) {
        this.stripe.allConnectedAccount()
            .then(res => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    deleteConnectedAccount(request, response) {
        let { id } = request.body;
        this.stripe.deleteConnectedAccount(id)
            .then(res => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    rejectConnectedAccount(request, response) {
        let { id, reason } = request.body;
        this.stripe.rejectConnectedAccount({ id, reason })
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    step1(request, response) {
        let { email, country, userId } = request.body;
        this.stripe.step1({ email, country }, userId)
            .then(res => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    step2(request, response) {
        let { userId, tokenId } = request.body;
        this.stripe.updateAccount(userId, tokenId)
            .then(res => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    step3(request, response) {
        let { userId, tokenId } = request.body;
        this.stripe.updateAccount(userId, tokenId)
            .then(res => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    step4(request, response) {
        let { userId, tokenId } = request.body;
        this.stripe.bankConnectAccount(userId, tokenId)
            .then(() => {
            this.stripe.completeAccount(userId)
                .then(res1 => { script_1.sendResult({ response, message: res1 }); })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.StripeAccountController = StripeAccountController;
