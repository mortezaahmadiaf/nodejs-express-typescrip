"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const script_1 = require("../../script");
class AdminUserManager {
    constructor() {
        this.AdminUsers = new model_1.AdminUsers();
    }
    saveUser(user_params) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.findUserByEmailWithRole(user_params.email, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        reject({ error: 'user exist', errorMsg: "User is exist !" }) :
                        this.AdminUsers.saveUser(user_params, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: "Database Error" }) :
                                resolve(res1);
                        });
            });
        });
    }
    updateUser(user_params) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.findUserById(user_params.id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    !res ?
                        reject({ error: '', errorMsg: 'User Not exist' }) :
                        this.AdminUsers.findOneAndUpdate(user_params, (er1, res1) => {
                            er1 ?
                                reject({ error: er, errorMsg: 'Database Error' }) :
                                resolve(res1);
                        });
            });
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.deleteOne(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    checkUserByEmail(login) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.findUserByEmailWithRole(login.email, (er, res) => {
                if (er)
                    reject({ errpr: er, errorMsg: "Database Error" });
                else if (res) {
                    let hash = script_1.encription({ password: login.password, salt: res.salt });
                    if (hash === res.password)
                        resolve(res);
                    else
                        reject({ error: "", errorMsg: "Your password is wrong !" });
                }
                else {
                    reject({ error: '', errorMsg: 'User Not Exist !' });
                }
            });
        });
    }
    selectAllAdminUser() {
        return new Promise((resolve, reject) => {
            this.AdminUsers.allusersWithRoles((er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    selectSome(params) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.limitCountOfUsersWithRoles(params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    changePassword(params) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.findUserById(params.id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    !res ?
                        reject({ error: "", errorMsg: 'User Not Exist' }) :
                        this.AdminUsers.changeUserPassword(params, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: 'Database Error' }) :
                                resolve(res1);
                        });
            });
        });
    }
    findUserById(id) {
        return new Promise((resolve, reject) => {
            this.AdminUsers.findUserByIdWithRole(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'User Not Exits' });
            });
        });
    }
}
exports.default = AdminUserManager;
