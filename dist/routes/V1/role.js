"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
const middleware_1 = require("../../middleware");
const checkUserPermission_1 = require("../../middleware/checkUserPermission");
const express_1 = require("express");
const validator_1 = require("../validator");
const roleController_1 = require("../../controllers/roleController");
class Role {
    constructor() {
        this.controller = new roleController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, validator_1.insertRole, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/').put(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, validator_1.updateRole, middleware_1.validation, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/all').get(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, (request, response, next) => {
            this.findAll(request, response, next);
        });
        this.router.route('/:page/:countPerPage').get(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, validator_1.pagination, middleware_1.validation, (request, response, next) => {
            this.pagination(request, response, next);
        });
        this.router.route('/').delete(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, (request, response, next) => {
            this.delete(request, response, next);
        });
        this.router.route('/permissions').get(middleware_1.jwtCheck, checkUserPermission_1.checkRoleManagementPermission, (request, response, next) => {
            this.permission(request, response, next);
        });
    }
    add(request, response, next) {
        this.controller.insertRole(request, response);
    }
    update(request, response, next) { this.controller.updateRole(request, response); }
    delete(request, response, next) { this.controller.deleteRole(request, response); }
    findAll(request, response, next) { this.controller.getAllRoles(request, response); }
    pagination(request, response, next) { this.controller.roleToPagination(request, response); }
    permission(request, response, next) { this.controller.getAllPermissions(request, response); }
}
const role = new Role().router;
exports.role = role;
