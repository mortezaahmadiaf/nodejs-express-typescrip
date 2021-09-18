"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/adminanel_users/manager");
const script_1 = require("../script");
const script_2 = require("../script");
const manager_2 = require("../modules/roles/manager");
const manager_3 = require("../modules/permissoins/manager");
const _ = require("lodash");
class AdminPanelUser {
    constructor() {
        this.Adminuser = new manager_1.default();
        this.role = new manager_2.RoleService();
        this.permission = new manager_3.PermissionManager();
    }
    newUser(request, response) {
        let { firstName, lastName, email, phone, role, password, image } = request.body;
        let salt = script_1.genRandomString({ stringLength: 15 });
        let hashPass = script_1.encription({ password, salt });
        let user = { firstName, lastName, email, phone, role, password: hashPass, salt, image };
        this.Adminuser.saveUser(user)
            .then((res) => { script_2.sendResult({ response, message: 'User create successfully' }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    Login(request, response) {
        let login = request.body;
        this.Adminuser.checkUserByEmail(login)
            .then((res) => {
            script_2.sendResult({
                response, message: {
                    user: res, token: script_2.createUserJWT({ id: res.id })
                }
            });
        })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    findUserById(request, response) {
        let { id } = request.params;
        this.Adminuser.findUserById(id)
            .then((user) => { script_2.sendResult({ response, message: { user } }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    findUserByIdWithPermissions(request, response) {
        let { id } = request.params;
        this.Adminuser.findUserById(id)
            .then((user) => {
            this.permission.findPermissonsByIds(user.Role.permissions)
                .then((permissions) => { script_2.sendResult({ response, message: { user, permissions } }); })
                .catch((er1) => { script_2.sendError({ response, message: er1.errorMsg }); });
        })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    findUserByIdFromToken(request, response) {
        let { id } = request['STUser'];
        this.Adminuser.findUserById(id)
            .then((user) => {
            this.permission.findPermissonsByIds(user.Role.permissions)
                .then((permissions) => { script_2.sendResult({ response, message: { user, permissions } }); })
                .catch((er1) => { script_2.sendError({ response, message: er1.errorMsg }); });
        })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    updateAdminpanelUser(request, response) {
        let user = request.body;
        this.Adminuser.updateUser(_.pickBy(user, _.identity))
            .then(() => { script_2.sendResult({ response, message: `User updated !!!` }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    resetAdminpanelUserPassword(request, response) {
        let { password, id } = request.body;
        let salt = script_1.genRandomString({ stringLength: 15 });
        let hashPass = script_1.encription({ password, salt });
        let info = { id, password: hashPass, salt };
        this.Adminuser.changePassword(info)
            .then(() => { script_2.sendResult({ response, message: `Password Changed ;)` }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    getAllAdminpanelUser(request, response) {
        this.Adminuser.selectAllAdminUser()
            .then((res) => { script_2.sendResult({ response, message: res }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    getAdminpanelUsersForPagination(request, response) {
        let { page, countPerPage } = request.params;
        let params = { limit: parseInt(countPerPage), offset: parseInt(countPerPage) * parseInt(page) };
        this.Adminuser.selectSome(params)
            .then((res) => { script_2.sendResult({ response, message: res }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    getAllRole(request, response) {
        this.role.getAllRoles()
            .then((res) => { script_2.sendResult({ response, message: res }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
    deleteAdminpanelUser(request, response) {
        let { id } = request.body;
        this.Adminuser.deleteUser(id)
            .then(() => { script_2.sendResult({ response, message: `User Deleted :)` }); })
            .catch((er) => { script_2.sendError({ response, message: er.errorMsg }); });
    }
}
exports.default = AdminPanelUser;
