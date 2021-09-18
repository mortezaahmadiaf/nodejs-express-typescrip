"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const script_1 = require("../../script");
const model_1 = require("./model");
class RoleService {
    constructor() {
        this.role = new model_1.RoleModel();
    }
    createRole(user_params) {
        return new Promise((resolve, reject) => {
            this.role.saveRole(user_params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: er.errors ? script_1.errorsHandler(er.errors) : 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    updateRole(params) {
        return new Promise((resolve, reject) => {
            this.role.findOneRoleById(params.id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    this.role.updateRole(params, (er1, res2) => {
                        er1 ?
                            reject({ error: er1, errorMsg: 'Database Error' }) :
                            resolve(res2);
                    });
            });
        });
    }
    deleteRole(id) {
        return new Promise((resolve, reject) => {
            this.role.deleteRole(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getAllRoles() {
        return new Promise((resolve, reject) => {
            this.role.findAllRoles((er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    getSomeRoles(params) {
        return new Promise((resolve, reject) => {
            this.role.limiteCountRoles(params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.RoleService = RoleService;
