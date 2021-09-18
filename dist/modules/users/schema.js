"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
const schema_1 = require("../profile/schema");
class Users extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined,
            password: undefined,
            salt: undefined
        };
    }
}
exports.Users = Users;
Users.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    countryCode: {
        type: sequelize_1.DataTypes.STRING,
        validate: {
            len: [1, 4]
        },
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Users',
    tableName: 'users'
});
Users.hasOne(schema_1.Profile, {
    foreignKey: 'userId',
    as: 'profile'
});
