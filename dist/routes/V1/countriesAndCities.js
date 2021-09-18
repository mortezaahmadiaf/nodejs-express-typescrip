"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countries = void 0;
const express_1 = require("express");
const contryController_1 = require("../../controllers/contryController");
class Countries {
    constructor() {
        this.controller = new contryController_1.CountryAndCity();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/countries').get((request, response, next) => {
            this.countries(request, response, next);
        });
        this.router.route('/cities/:country').get((request, response, next) => {
            this.countryCities(request, response, next);
        });
    }
    countries(request, response, next) {
        this.controller.getAllCountry(request, response);
    }
    countryCities(request, response, next) {
        this.controller.getCountryCities(request, response);
    }
}
const countries = new Countries().router;
exports.countries = countries;
