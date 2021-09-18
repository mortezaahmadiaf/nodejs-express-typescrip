"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class VersionManager {
    constructor() {
        this.version = new model_1.default();
    }
    updateVersion(v) {
        return new Promise((resolve, reject) => {
            this.version.findVersion((er, res) => {
                er
                    ? reject({ error: er, errorMsg: 'Database Error' })
                    : res
                        ? this.version.updateVersion(v, (er1, res1) => {
                            er ? reject({ error: er1, errorMsg: 'Database Error' }) : resolve(res);
                        })
                        : this.version.save(v, (er2, res2) => {
                            er2 ? reject({ error: er2, errorMsg: 'Database Error' }) : resolve(res2);
                        });
            });
        });
    }
    getVersion() {
        return new Promise((resolve, reject) => {
            this.version.findVersion((er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) : resolve(res);
            });
        });
    }
}
exports.default = VersionManager;
