"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUs = void 0;
const script_1 = require("../../script");
class ContactUs {
    constructor(info) {
        this.email = info.email;
        this.message = info.message;
        this.name = info.name;
        this.see = false;
        this.userId = info.userId;
        this.date = new Date;
        this.ticket = '#JOBEE-' + script_1.genRandomString({ stringLength: 12 }).toUpperCase();
        this.answer = { message: '', name: '', userId: '', date: new Date };
        this.subject = info.subject;
    }
    getJson() {
        return {
            email: this.email,
            message: this.message,
            name: this.name,
            see: this.see,
            userId: this.userId,
            date: this.date,
            ticket: this.ticket,
            answer: this.answer,
            subject: this.subject
        };
    }
}
exports.ContactUs = ContactUs;
