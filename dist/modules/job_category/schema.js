'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jobcategory = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Jobcategory extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined
        };
    }
}
exports.Jobcategory = Jobcategory;
Jobcategory.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: {
                msg: 'minimum length is 3',
                args: [10]
            },
        }
    }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Jobcategory',
    tableName: 'jobcategory'
});
