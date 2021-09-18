"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessages_1 = require("../../script/sendMessages");
class NotFound {
    constructor() {
        this.preRoute = '*';
    }
    route(app) {
        app.route(`${this.preRoute}`).all((_, response) => {
            sendMessages_1.sendError({ status: 404, response, message: 'Please check your URL' });
        });
    }
}
exports.default = new NotFound();
