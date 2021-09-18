"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const BaseRouter_1 = require("../BaseRouter");
const userController_1 = require("../../controllers/userController");
class User extends BaseRouter_1.BaseRouter {
    constructor() {
        super(userController_1.default);
        this.init();
    }
    init() {
        super.init();
    }
}
const user = new User().router;
exports.user = user;
