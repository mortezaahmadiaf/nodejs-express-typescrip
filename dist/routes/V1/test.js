"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testController_1 = require("../../controllers/testController");
const BaseRouter_1 = require("../BaseRouter");
class TestRoutes extends BaseRouter_1.BaseRouter {
    constructor() {
        super(testController_1.default);
        this.init();
    }
    init() {
        super.init();
    }
}
exports.default = new TestRoutes().router;
