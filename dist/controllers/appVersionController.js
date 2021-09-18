"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const manager_1 = require("../modules/version/manager");
const script_1 = require("../script");
class version {
    constructor() {
        this.version = new manager_1.default();
    }
    updateAppVersion(request, response) {
        let { version } = request.body;
        this.version.updateVersion(version)
            .then(() => { script_1.sendResult({ response, message: `Version Updated :)` }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getAppVersion(request, response) {
        this.version.getVersion()
            .then((res) => {
            script_1.sendResult({ response, message: res });
        })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.default = version;
