'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Roles extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined
        };
    }
}
exports.Roles = Roles;
Roles.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    roleName: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    permissions: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.UUID),
        defaultValue: []
    }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Roles',
    tableName: 'roles'
});
