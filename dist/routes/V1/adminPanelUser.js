"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPanelUser = void 0;
const middleware_1 = require("../../middleware");
const express_1 = require("express");
const validator_1 = require("../validator");
const adminPanelUserController_1 = require("../../controllers/adminPanelUserController");
class AdminPanelUser {
    constructor() {
        this.controller = new adminPanelUserController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, validator_1.insertUserValidation, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/').put(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, validator_1.adminpanelUserUpdate, middleware_1.validation, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/').delete(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.delete(request, response, next);
        });
        this.router.route('/login').post(validator_1.adminpanelLogin, middleware_1.validation, (request, response, next) => {
            this.login(request, response, next);
        });
        this.router.route('/reset-password').post(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, validator_1.adminpanelChangePassword, middleware_1.validation, (request, response, next) => {
            this.resetPassword(request, response, next);
        });
        this.router.route('/roles').get(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.getRoules(request, response, next);
        });
        this.router.route('/user/:id').get(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.findById(request, response, next);
        });
        this.router.route('/user').get(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.findByToken(request, response, next);
        });
        this.router.route('/all').get(middleware_1.jwtCheck, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.findAll(request, response, next);
        });
        this.router.route('/:page/:countPerPage').get(middleware_1.jwtCheck, validator_1.pagination, middleware_1.validation, middleware_1.checkUserManagementPermission, (request, response, next) => {
            this.pagination(request, response, next);
        });
    }
    login(request, response, next) {
        this.controller.Login(request, response);
    }
    add(request, response, next) {
        this.controller.newUser(request, response);
    }
    update(request, response, next) {
        this.controller.updateAdminpanelUser(request, response);
    }
    findById(request, response, next) {
        this.controller.findUserByIdWithPermissions(request, response);
    }
    findAll(request, response, next) {
        this.controller.getAllAdminpanelUser(request, response);
    }
    delete(request, response, next) {
        this.controller.deleteAdminpanelUser(request, response);
    }
    findByToken(request, response, next) {
        this.controller.findUserByIdFromToken(request, response);
    }
    resetPassword(request, response, next) {
        this.controller.resetAdminpanelUserPassword(request, response);
    }
    getRoules(request, response, next) {
        this.controller.getAllRole(request, response);
    }
    pagination(request, response, next) {
        this.controller.getAdminpanelUsersForPagination(request, response);
    }
}
const adminPanelUser = new AdminPanelUser().router;
exports.adminPanelUser = adminPanelUser;
