'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adminpanel_user = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
const schema_1 = require("../roles/schema");
class Adminpanel_user extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            createdAt: undefined,
            updatedAt: undefined,
            salt: undefined,
            role: undefined,
            password: undefined
        };
    }
}
exports.Adminpanel_user = Adminpanel_user;
Adminpanel_user.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'First name must be text'
            }
        }
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: 'Last name must be text'
            }
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email type error'
            }
        }
    },
    phone: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
        unique: true,
        validate: {
            isNumeric: {
                msg: 'Phone number type error'
            },
            len: [6, 15]
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        validate: {
            isUUID: {
                msg: 'Role id error',
                args: 4
            }
        }
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: 'Adminpanel_user',
    tableName: 'adminpanel_user'
});
Adminpanel_user.belongsTo(schema_1.Roles, { foreignKey: 'role' });
