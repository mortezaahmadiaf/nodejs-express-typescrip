"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Version extends sequelize_1.Model {
}
exports.Version = Version;
Version.init({
    version: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isNumeric: {
                msg: 'version must be number'
            }
        }
    },
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Version',
    tableName: 'version'
});
