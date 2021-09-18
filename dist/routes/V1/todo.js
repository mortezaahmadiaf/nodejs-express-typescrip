"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = void 0;
const todoController_1 = require("../../controllers/todoController");
const BaseRouter_1 = require("../BaseRouter");
class ToDo extends BaseRouter_1.BaseRouter {
    constructor() {
        super(todoController_1.default);
        this.init();
    }
    init() {
        super.init();
    }
}
const todo = new ToDo().router;
exports.todo = todo;
