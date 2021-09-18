"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesAndCitiesModel = void 0;
const schema_1 = require("./schema");
const sequelize_1 = require("sequelize");
class CountriesAndCitiesModel {
    constructor() {
        this.countriesCities = schema_1.Country;
    }
    async allCountries(callback) {
        try {
            let result = await this.countriesCities.findAll({
                attributes: ["country"],
                group: "country",
                order: [["country", "ASC"]],
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findLocationById(id, callback) {
        try {
            let result = await this.countriesCities.findOne({
                where: { id },
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allCitiesOfCountry(country, callback) {
        try {
            let result = await this.countriesCities.findAll({
                where: {
                    country,
                },
                group: ["subcountry"],
                attributes: [
                    "subcountry",
                    [sequelize_1.Sequelize.fn("max", sequelize_1.Sequelize.col("geonameid")), "geonameid"],
                    [sequelize_1.Sequelize.fn("max", sequelize_1.Sequelize.col("id")), "id"],
                ],
                order: [["subcountry", "ASC"]],
                raw: true,
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.CountriesAndCitiesModel = CountriesAndCitiesModel;
