"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
const bson_1 = require("bson");
const script_1 = require("../../script");
class ContactUsManager {
    constructor() {
        this.contact = new model_1.ContactUsModel();
    }
    newContact(params) {
        return new Promise((resolve, reject) => {
            let info = new schema_1.ContactUs(params).getJson();
            this.contact.saveContact(info, (er, res) => {
                res &&
                    script_1.emailDelivery({ customer: info.name, ticket: info.ticket, to: info.email }, (er, res) => { });
                er ? reject({ error: er, errorMsg: "Your message not recived ." }) :
                    resolve("Your message recived .");
            });
        });
    }
    checkedContact(answer) {
        return new Promise((resolve, reject) => {
            this.contact.updateContactAnswerAndSeeToTrue(new bson_1.ObjectId(answer._id), answer, (er, res) => {
                res &&
                    script_1.emailDelivery({
                        name: answer.name,
                        customer: res.name,
                        ticket: res.ticket,
                        to: res.email,
                        question: false,
                        message: answer.message,
                    }, (er, res) => { });
                er
                    ? reject({ error: er, errorMsg: "Something went wrong in Databasse" })
                    : resolve("User answer inserted");
            });
        });
    }
    checkedOneUserContacts(userId) {
        return new Promise((resolve, reject) => {
            this.contact.updateUserContactSeeToTrue(userId, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: "Database Error" })
                    : res.value
                        ? resolve(res)
                        : reject({ error: "", errorMsg: "Something went wrong !" });
            });
        });
    }
    allContacts() {
        return new Promise((resolve, reject) => {
            this.contact.finAllContact((er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    allContactsNotChecked() {
        return new Promise((resolve, reject) => {
            this.contact.finAllContactNotChecked((er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    allAnswerdContact() {
        return new Promise((resolve, reject) => {
            this.contact.finAllContactChecked((er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    findAnswerdContactbyTicket(param) {
        return new Promise((resolve, reject) => {
            this.contact.filterAllContactChecked(param.toUpperCase(), (er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    delete(_id) {
        return new Promise((resolve, reject) => {
            this.contact.delete(new bson_1.ObjectId(_id), (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.ContactUsManager = ContactUsManager;
