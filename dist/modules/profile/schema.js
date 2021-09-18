"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Profile extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined
        };
    }
}
exports.Profile = Profile;
Profile.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Profile',
    tableName: 'profile'
});
