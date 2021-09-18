'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class Permissions extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined
        };
    }
}
exports.Permissions = Permissions;
Permissions.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    permissionName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'permissionName must havew value'
            }
        }
    },
    permission: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Permissions',
    tableName: 'permissions'
});
