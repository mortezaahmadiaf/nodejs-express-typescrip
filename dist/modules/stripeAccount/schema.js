"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFinal = exports.CreateAccountStep1 = exports.StripeAccount = void 0;
const sequelize_1 = require("sequelize");
const connectToDatabasePostgresql_1 = require("../../config/connectToDatabasePostgresql");
class StripeAccount extends sequelize_1.Model {
    toJSON() {
        return {
            ...this.get(),
            updatedAt: undefined,
            createdAt: undefined,
        };
    }
}
exports.StripeAccount = StripeAccount;
StripeAccount.init({
    id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        unique: true,
        allowNull: false,
    },
    accountId: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        defaultValue: null,
    },
    stripeAccountCompleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: connectToDatabasePostgresql_1.default,
    modelName: "StripeAccount",
    tableName: "stripeaccount",
});
class CreateAccountStep1 {
    constructor(info) {
        this.capabilities = { card_payments: { requested: false }, transfers: { requested: true } };
        this.type = "custom";
        this.business_type = 'individual';
        this.country = info.country;
        this.email = info.email;
    }
    getJson() {
        return {
            business_type: this.business_type,
            capabilities: this.capabilities,
            country: this.country,
            email: this.email,
            type: this.type,
            tos_acceptance: { service_agreement: "full" }
        };
    }
}
exports.CreateAccountStep1 = CreateAccountStep1;
class CreateFinal {
    constructor(info) {
        this.getJson = () => {
            return {
                metadata: this.metadata,
                individual: this.individual,
                business_type: this.business_type,
                country: this.country,
                email: this.email,
                capabilities: this.capabilities,
                type: this.type
            };
        };
        this.business_type = info.business_type;
        this.country = info.country;
        this.email = info.email;
        this.capabilities = info.capabilities;
        this.type = info.type;
    }
}
exports.CreateFinal = CreateFinal;
