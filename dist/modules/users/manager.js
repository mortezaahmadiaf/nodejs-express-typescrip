"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
const script_1 = require("../../script");
const model_1 = require("./model");
class UserManager {
    constructor() {
        this.user = new model_1.UserModel();
    }
    createUser(user_params) {
        return new Promise((resolve, reject) => {
            this.user.findUserByPhone({ countryCode: user_params.countryCode, phone: user_params.phone }, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        reject({ error: "", errorMsg: 'This phone number exist' }) :
                        this.user.save(user_params, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: 'Database Error' }) :
                                resolve(res);
                        });
            });
        });
    }
    changePassword(params, oldPassword) {
        return new Promise((resolve, reject) => {
            this.user.findUserById(params.id, (er1, user) => {
                if (er1)
                    reject({ error: er1, errorMsg: 'Database Error' });
                else if (!user)
                    reject({ error: "", errorMsg: 'User Not Exist' });
                else {
                    let hashPass = script_1.encription({ salt: user.salt, password: oldPassword });
                    if (hashPass === user.password) {
                        this.user.updatePassword(params, (er, res) => {
                            er ?
                                reject({ error: er, errorMsg: 'Database Error' }) :
                                resolve(res);
                        });
                    }
                    else
                        reject({ error: "", errorMsg: 'Your old password in wrong' });
                }
            });
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            this.user.deleteUser(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
    findUserById(id) {
        return new Promise((resolve, reject) => {
            this.user.findUserByIdWithProfile(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'User not exist' });
            });
        });
    }
    findUsersByPhone(params) {
        return new Promise((resolve, reject) => {
            this.user.findUserByPhone(params, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res);
            });
        });
    }
}
exports.UserManager = UserManager;
