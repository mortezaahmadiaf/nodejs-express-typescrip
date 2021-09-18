"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryAndCity = void 0;
const manager_1 = require("../modules/countries_cities/manager");
const script_1 = require("../script");
class CountryAndCity {
    constructor() {
        this.countries_cities = new manager_1.CountriedAndCitiesManager();
    }
    getAllCountry(request, response) {
        this.countries_cities.allCountries()
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
    getCountryCities(request, response) {
        let { country } = request.params;
        this.countries_cities.cities(country)
            .then((res) => { script_1.sendResult({ response, message: res }); })
            .catch((er) => { script_1.sendError({ response, message: er.errorMsg }); });
    }
}
exports.CountryAndCity = CountryAndCity;
