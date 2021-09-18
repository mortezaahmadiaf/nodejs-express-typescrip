"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeAccountMdel = void 0;
const schema_1 = require("./schema");
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
class StripeAccountMdel {
    constructor() {
        this.stripe = schema_1.StripeAccount;
    }
    async create(info, callback) {
        try {
            let result = await this.stripe.create(info);
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    async findStripeConnectedAccountWithUserId(userId, callback) {
        try {
            let result = await this.stripe.findOne({ where: { userId } });
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    async updateStripeAccountId(accountId, userId, callback) {
        try {
            let account = await this.stripe.findOne({ where: { userId } });
            let result = await account.update({ accountId });
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    async complitedStripeConnectedAccountWithUserIdAccountId(userId, callback) {
        try {
            let account = await this.stripe.findOne({ where: { userId } });
            let result = await account.update({ stripeAccountCompleted: true });
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    async check(userId, callback) {
        try {
            let res = await mongoDbHelper_1.default.stripeAccount.findOne({ userId });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async step1(info, userId, callback) {
        try {
            let res = await mongoDbHelper_1.default.stripeAccount.insertOne({ ...info, userId });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async step2(info, userId, callback) {
        try {
            let res = await mongoDbHelper_1.default.stripeAccount.findOneAndUpdate({ userId, step: 'step1' }, { $set: { individual: { ...info }, step: "step2" } });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async step3(address, userId, callback) {
        try {
            let res = await mongoDbHelper_1.default.stripeAccount.findOneAndUpdate({ userId, step: 'step2' }, { $set: { 'individual.address': address, step: "step3" } });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
}
exports.StripeAccountMdel = StripeAccountMdel;
