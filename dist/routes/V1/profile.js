"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = void 0;
const profileController_1 = require("../../controllers/profileController");
const BaseRouter_1 = require("../BaseRouter");
class Profile extends BaseRouter_1.BaseRouter {
    constructor() {
        super(profileController_1.default);
        this.init();
    }
    init() {
        super.init();
    }
}
const profile = new Profile().router;
exports.profile = profile;
