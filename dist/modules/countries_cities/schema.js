'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCities = exports.getAllCountry = exports.Country = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Country extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined
        };
    }
}
exports.Country = Country;
Country.init({
    name: { type: sequelize_1.DataTypes.STRING },
    country: { type: sequelize_1.DataTypes.STRING },
    subcountry: { type: sequelize_1.DataTypes.STRING },
    geonameid: { type: sequelize_1.DataTypes.INTEGER }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Country',
    tableName: "country"
});
const getAllCountry = () => Country.findAll({
    attributes: ['country'],
    group: 'country',
    order: [
        ['country', 'ASC']
    ]
});
exports.getAllCountry = getAllCountry;
const getCountryCities = ({ country }) => Country.findAll({
    where: {
        country
    },
    group: ['subcountry'],
    attributes: [
        'subcountry',
        [
            sequelize_1.Sequelize.fn('max', sequelize_1.Sequelize.col('geonameid')),
            'geonameid'
        ],
        [
            sequelize_1.Sequelize.fn('max', sequelize_1.Sequelize.col('id')),
            'id'
        ]
    ],
    order: [
        ['subcountry', 'ASC']
    ],
    raw: true
});
exports.getCountryCities = getCountryCities;
