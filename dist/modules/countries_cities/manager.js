"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriedAndCitiesManager = void 0;
const model_1 = require("./model");
class CountriedAndCitiesManager {
    constructor() {
        this.world = new model_1.CountriesAndCitiesModel();
    }
    allCountries() {
        return new Promise((resolve, reject) => {
            this.world.allCountries((er, res) => {
                er ? reject({ error: er, errorMsg: 'Databse Error' }) : resolve(res);
            });
        });
    }
    cities(country) {
        return new Promise((resolve, reject) => {
            this.world.allCitiesOfCountry(country, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Databse Error' }) : resolve(res);
            });
        });
    }
    findLocationById(id) {
        return new Promise((resolve, reject) => {
            this.world.findLocationById(id, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Databse Error' }) : resolve(res);
            });
        });
    }
}
exports.CountriedAndCitiesManager = CountriedAndCitiesManager;
