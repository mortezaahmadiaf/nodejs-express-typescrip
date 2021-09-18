"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileManager = void 0;
const model_1 = require("./model");
class ProfileManager {
    constructor() {
        this.profile = new model_1.ProfileModel();
    }
    createProfile(params) {
        return new Promise((resolve, reject) => {
            this.profile.saveProfile(params, (er, res) => {
                er ? reject({ error: er, errormsg: 'Database Error' }) : resolve(res);
            });
        });
    }
    updateProfile(params) {
        return new Promise((resolve, reject) => {
            this.profile.findProfileById(params.id, (er, res) => {
                er
                    ? reject({ error: er, errorMsg: 'Database Error' })
                    : !res
                        ? reject({ error: er, errorMsg: 'Profole not exist' })
                        : this.profile.updateProfile(params, (er1, res1) => {
                            er1 ? reject({ error: er1, errorMsg: 'Database Error' }) : resolve(res1);
                        });
            });
        });
    }
    getProfileById(id) {
        return new Promise((resolve, reject) => {
            this.profile.findProfileById(id, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    !res ? reject({ error: "", errorMsg: 'Profole not exist' }) :
                        resolve(res);
            });
        });
    }
}
exports.ProfileManager = ProfileManager;
