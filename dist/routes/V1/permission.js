"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = void 0;
const express_1 = require("express");
const validator_1 = require("../validator");
const middleware_1 = require("../../middleware");
const permissionsController_1 = require("../../controllers/permissionsController");
class Permission {
    constructor() {
        this.controller = new permissionsController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, validator_1.newPermission, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/user-permission').post(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, validator_1.userPermission, middleware_1.validation, (request, response, next) => {
            this.userPermissionByToken(request, response, next);
        });
        this.router.route('/user-permission/:id').get(middleware_1.jwtCheck, validator_1.id, middleware_1.validation, (request, response, next) => {
            this.userPermission(request, response, next);
        });
        this.router.route('/').put(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, validator_1.updatePermission, middleware_1.validation, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/all').get(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, (request, response, next) => {
            this.findAll(request, response, next);
        });
        this.router.route('/:page/:countPerPage').get(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, (request, response, next) => {
            this.pagination(request, response, next);
        });
        this.router.route('/').delete(middleware_1.jwtCheck, middleware_1.checkPermissionManagementPermission, (request, response, next) => {
            this.delete(request, response, next);
        });
    }
    add(request, response, next) {
        this.controller.insertPermission(request, response);
    }
    update(request, response, next) {
        this.controller.updatePermission(request, response);
    }
    delete(request, response, next) {
        this.controller.deletePermisson(request, response);
    }
    findAll(request, response, next) {
        this.controller.getAllPermission(request, response);
    }
    pagination(request, response, next) {
        this.controller.permissionToPagination(request, response);
    }
    userPermission(request, response, next) {
        this.controller.userPermissions(request, response);
    }
    userPermissionByToken(request, response, next) {
        this.controller.FindPermissions(request, response);
    }
}
const permission = new Permission().router;
exports.permission = permission;
