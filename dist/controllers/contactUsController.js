"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsController = void 0;
const manager_1 = require("../modules/contactUs/manager");
const script_1 = require("../script");
class ContactUsController {
    constructor() {
        this.conatact = new manager_1.ContactUsManager();
    }
    addContact(request, response) {
        let message = request.body;
        this.conatact.newContact(message)
            .then((result) => { script_1.sendResult({ response, message: result }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    checkContact(request, response) {
        let { _id, userId, message, name } = request.body;
        let answer = { userId, message, name, date: new Date(), _id };
        this.conatact.checkedContact(answer)
            .then((result) => { script_1.sendResult({ response, message: result }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    checkOneUserAllContact(request, response) {
        let { userId } = request.params;
        this.conatact.checkedOneUserContacts(userId)
            .then((result) => { script_1.sendResult({ response, message: result }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    allContacts(_, response) {
        this.conatact.allContacts()
            .then((result) => { script_1.sendResult({ response, message: result }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    allNotCheckedContacts(_, response) {
        this.conatact.allContactsNotChecked()
            .then((result) => { script_1.sendResult({ response, message: result }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    allNotCheckedContactsCount(_, response) {
        this.conatact.allContactsNotChecked()
            .then((result) => { script_1.sendResult({ response, message: { count: result.length } }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    allCheckedContacts(_, response) {
        this.conatact.allAnswerdContact()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: "Database Error" }); });
    }
    filterAnswerdContactbyTicket(request, response) {
        let { param } = request.body;
        this.conatact.findAnswerdContactbyTicket(param)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    deleteContactUs(request, response) {
        let { id } = request.body;
        this.conatact.delete(id)
            .then(() => { script_1.sendResult({ response, message: { message: "Delete item done", result: true }, }); })
            .catch((er) => { script_1.sendError({ response, message: { message: er.errorMsg, result: false } }); });
    }
}
exports.ContactUsController = ContactUsController;
