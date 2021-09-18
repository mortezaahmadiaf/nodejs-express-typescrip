"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/roles/manager");
const script_1 = require("../script");
const manager_2 = require("../modules/permissoins/manager");
class default_1 {
    constructor() {
        this.role = new manager_1.RoleService();
        this.permission = new manager_2.PermissionManager();
    }
    insertRole(request, response) {
        let { role, roleName } = request.body;
        let ro = { role, roleName };
        this.role.createRole(ro)
            .then(() => { script_1.sendResult({ response, message: `Role ${roleName} added :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    updateRole(request, response) {
        let role = request.body;
        this.role.updateRole(role)
            .then(() => { script_1.sendResult({ response, message: `Role ${role.roleName} updated :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getAllRoles(request, response) {
        this.role.getAllRoles()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getAllPermissions(request, response) {
        this.permission.getAllPermission()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    roleToPagination(request, response) {
        let { page, countPerPage } = request.body;
        let som = { limit: parseInt(countPerPage), offset: parseInt(page) * parseInt(countPerPage) };
        this.role.getSomeRoles(som)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    deleteRole(request, response) {
        let { id } = request.body;
        this.role.deleteRole(id)
            .then(() => { script_1.sendResult({ response, message: "Role Deleted :)" }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.default = default_1;
