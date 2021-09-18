"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    constructor(controller) {
        this.controller = new controller();
        this.router = express_1.Router();
    }
    init() {
        let urls = {
            get: "/",
            getById: "/id/:id",
            post: "/",
            put: "/",
            delete: "/"
        };
        this.router.route(urls.post).post((req, res, next) => {
            this.add(req, res, next);
        });
        this.router.route(urls.put).put((req, res, next) => { this.update(req, res, next); });
        this.router.route(urls.delete).delete((req, res, next) => { this.delete(req, res, next); });
        this.router.route(urls.get).get((req, res, next) => { this.findAll(req, res, next); });
        this.router.route(urls.getById).get((req, res, next) => { this.findOne(req, res, next); });
    }
    add(req, res, next) {
        this.controller.add(req, res, next);
    }
    update(req, res, next) { this.controller.update(req, res, next); }
    delete(req, res, next) { this.controller.delete(req, res, next); }
    findOne(req, res, next) { this.controller.findOne(req, res, next); }
    findAll(req, res, next) { this.controller.findAll(req, res, next); }
}
exports.BaseRouter = BaseRouter;
