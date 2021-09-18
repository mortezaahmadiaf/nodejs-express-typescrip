"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constactUs = void 0;
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const contactUsController_1 = require("../../controllers/contactUsController");
const validator_1 = require("../validator");
class ContactUs {
    constructor() {
        this.controller = new contactUsController_1.ContactUsController();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, validator_1.AddContactUs, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/checked-contact').post(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, validator_1.answerContactUs, middleware_1.validation, (request, response, next) => {
            this.checked(request, response, next);
        });
        this.router.route('/checked-all/:userId').post(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.allCheckedByUserId(request, response, next);
        });
        this.router.route('/filter').post(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, (request, response, next) => {
            this.filter(request, response, next);
        });
        this.router.route('/all').get(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, (request, response, next) => {
            this.findAll(request, response, next);
        });
        this.router.route('/checked/all').get(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, (request, response, next) => {
            this.checkedAll(request, response, next);
        });
        this.router.route('/not-checked/all').get(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, (request, response, next) => {
            this.notCheckedAll(request, response, next);
        });
        this.router.route('/not-checked/all/count').get(middleware_1.jwtCheck, middleware_1.checkContactUsPermission, (request, response, next) => {
            this.notCheckedCount(request, response, next);
        });
    }
    add(request, response, next) {
        this.controller.addContact(request, response);
    }
    checked(request, response, next) {
        this.controller.checkContact(request, response);
    }
    allCheckedByUserId(request, response, next) {
        this.controller.checkOneUserAllContact(request, response);
    }
    filter(request, response, next) {
        this.controller.filterAnswerdContactbyTicket(request, response);
    }
    findAll(request, response, next) {
        this.controller.allContacts(request, response);
    }
    checkedAll(request, response, next) {
        this.controller.allCheckedContacts(request, response);
    }
    notCheckedAll(request, response, next) {
        this.controller.allNotCheckedContacts(request, response);
    }
    notCheckedCount(request, response, next) {
        this.controller.allNotCheckedContactsCount(request, response);
    }
}
const constactUs = new ContactUs().router;
exports.constactUs = constactUs;
