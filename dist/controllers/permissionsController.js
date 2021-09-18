"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/permissoins/manager");
const script_1 = require("../script");
const manager_2 = require("../modules/adminanel_users/manager");
class Permissons {
    constructor() {
        this.permission = new manager_1.PermissionManager();
        this.adminUser = new manager_2.default();
    }
    insertPermission(request, response) {
        let permision = request.body;
        this.permission.createPermmission(permision)
            .then(() => { script_1.sendResult({ response, message: `Permission ${permision.permissionName} inserted :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    updatePermission(request, response) {
        let permision = request.body;
        this.permission.updatePermission(permision)
            .then(() => { script_1.sendResult({ response, message: `Permission ${permision.permissionName} updated :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    FindPermissions(request, response) {
        let { permissions } = request.body;
        this.permission.findPermissonsByIds(permissions)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    userPermissions(request, response) {
        let { id } = request.params;
        this.adminUser.findUserById(id)
            .then((user) => {
            this.permission.findPermissonsByIds(user.Role.permissions)
                .then((res) => { script_1.sendResult({ response, message: res }); })
                .catch((er1) => { script_1.sendError({ response, message: er1 }); });
        })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    getAllPermission(_, response) {
        this.permission.getAllPermission()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    permissionToPagination(request, response) {
        let { page, countPerPage } = request.params;
        let some = { limit: parseInt(countPerPage), offset: parseInt(page) * parseInt(countPerPage) };
        this.permission.getSomePermission(some)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
    deletePermisson(request, response) {
        let { id } = request.body;
        this.permission.deletePermission(id)
            .then(() => { script_1.sendResult({ response, message: 'Permission Deleted :)' }); })
            .catch((er) => { script_1.sendError({ response, message: er }); });
    }
}
exports.default = Permissons;
