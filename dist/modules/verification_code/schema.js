"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationCode = void 0;
class VerificationCode {
    constructor(info) {
        this.phone = info.phone;
        this.countryCode = info.countryCode;
        this.code = info.code;
        this.expireDate = new Date();
    }
    getJson() {
        return {
            code: this.code,
            countryCode: this.countryCode,
            phone: this.phone,
            expireDate: this.expireDate
        };
    }
}
exports.VerificationCode = VerificationCode;
