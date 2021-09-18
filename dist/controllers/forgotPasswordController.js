"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/verification_code/manager");
const manager_2 = require("../modules/verifid_user/manager");
const manager_3 = require("../modules/users/manager");
const script_1 = require("../script");
const script_2 = require("../script");
class ForgotPassword {
    constructor() {
        this.verifiPhone = new manager_1.VerificationCodeManager();
        this.user = new manager_3.UserManager();
        this.verifiUser = new manager_2.VerificationUserManager();
    }
    verifyPhoneToForgotPassword(request, response) {
        let { phone, countryCode } = request.body;
        let code = script_2.generateRandomCode();
        this.user.findUsersByPhoneAndReturnUser({ phone, countryCode })
            .then(() => {
            this.verifiPhone.addVerificationCode({ phone, countryCode, code })
                .then(() => {
                script_1.sendMessages({ phoneNumber: countryCode + phone, verifyCode: code });
                script_1.sendResult({ response, message: { result: true, code } });
            })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    verifyOTPCodeToForgotPassword(request, response) {
        let { code } = request.body;
        this.verifiPhone.checkCode(parseInt(code))
            .then((res) => {
            this.verifiUser.addVerificationUser(res)
                .then(() => { script_1.sendResult({ response, message: { result: true } }); })
                .catch((er1) => { script_1.sendError({ response, message: er1 }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    storePasswordToForgotPassword(request, response) {
        let { code, password } = request.body;
        this.verifiUser.checkVerificationUser(code)
            .then((res) => {
            this.user.resetPassword(res, password)
                .then((user) => {
                let token = script_1.createUserJWT({ id: user.id });
                script_1.sendResult({ response, message: { message: 'Your password changed !', result: true, token, user } });
            })
                .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
}
exports.default = ForgotPassword;
