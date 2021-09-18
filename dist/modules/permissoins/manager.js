"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionManager = void 0;
const model_1 = require("./model");
class PermissionManager {
    constructor() {
        this.permission = new model_1.PermissionModel();
    }
    createPermmission(params) {
        return new Promise((resolve, reject) => {
            this.permission.savePermisson(params, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: "Database Error" })
                    : resolve(res);
            });
        });
    }
    updatePermission(params) {
        return new Promise((resolve, reject) => {
            this.permission.findOnePermissonById(params.id, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: "Database Error" })
                    : !res
                        ? reject({ error: "", errorMsg: "Permission not exist" })
                        : this.permission.updatePermisson(params, (er1, res) => {
                            er1 ? reject({ error: er1, errorMsg: "Database Error" }) :
                                resolve(res);
                        });
            });
        });
    }
    getAllPermission() {
        return new Promise((resolve, reject) => {
            this.permission.allPermisson((er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    getSomePermission(params) {
        return new Promise((resolve, reject) => {
            this.permission.limitCountPermisson(params, (er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    findPermissonsByIds(params) {
        return new Promise((resolve, reject) => {
            this.permission.findPermissonsByIds(params, (er, res) => {
                er ? reject({ error: er, errorMsg: "Database Error" }) : resolve(res);
            });
        });
    }
    deletePermission(id) {
        return new Promise((resolve, reject) => {
            this.permission.deletePermission(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Database Error" }) :
                    resolve(res);
            });
        });
    }
}
exports.PermissionManager = PermissionManager;
