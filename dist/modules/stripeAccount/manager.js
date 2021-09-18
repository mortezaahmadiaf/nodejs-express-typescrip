"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeAccountManager = void 0;
const schema_1 = require("./schema");
const model_1 = require("./model");
const stripe_1 = require("stripe");
class StripeAccountManager {
    constructor() {
        this.connectedAccount = new model_1.StripeAccountMdel();
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2020-08-27",
        });
    }
    async createEmptyConnectedAccount(info, callback) {
        let c = new schema_1.CreateFinal(info).getJson();
        try {
            let account = await this.stripe.accounts.create(c);
            callback(undefined, account);
        }
        catch (error) {
            callback(error);
        }
    }
    async createAccountLinkByConnectedAccountId(id, userId, callback) {
        try {
            const accountLinks = await this.stripe.accountLinks.create({
                account: id,
                refresh_url: "https://reauth",
                return_url: `http://10.10.10.175:4000/stripe/account-complete/${userId}`,
                type: "account_onboarding",
            });
            callback(undefined, accountLinks);
        }
        catch (error) {
            callback(error);
        }
    }
    async stripeConnectedAccountPersonalInfo(id, callback) {
        try {
            const result = await this.stripe.accounts.update(id, {
                business_type: "individual",
                individual: {
                    dob: { day: 0o1, month: 0o1, year: 1993 },
                    first_name: "",
                    last_name: "",
                    id_number: "",
                    phone: "",
                    address: {
                        city: "Half Way",
                        line1: "2467  Twin House Lane",
                        postal_code: "65663",
                        state: "MO",
                    },
                },
            });
            callback(undefined, result);
        }
        catch (error) {
            callback(error);
        }
    }
    async checkStripeAccoun(email, AccountId, callback) {
        try {
            let res2 = await this.stripe.accounts.update(AccountId, {
                individual: {
                    dob: { day: 0o1, month: 0o1, year: 1993 },
                    email,
                    first_name: "morteza",
                    last_name: "ahmad",
                    address: {
                        city: "Half Way",
                        line1: "2467  Twin House Lane",
                        postal_code: "65663",
                        state: "MO",
                    },
                },
                business_type: "individual",
                email,
                business_profile: { name: "" }
            });
            callback(undefined, res2);
        }
        catch (error) {
            callback(error);
        }
    }
    async createLoginPageLink(AccountId, callback) {
        try {
            let res = await this.stripe.accounts.createLoginLink(AccountId);
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async allAccounts(callback) {
        try {
            let res = await this.stripe.accounts.list({
                limit: 3,
            });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async deleteAccounts(id, callback) {
        try {
            let res = await this.stripe.accounts.del(id);
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async paginationAccounts(paging = { offset: 0, limit: 10 }, callback) {
        try {
            let res = await this.stripe.accounts.list({
                starting_after: `${paging.offset}`,
                limit: paging.limit,
            });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async rejectAccounts(reject, callback) {
        try {
            let res = await this.stripe.accounts.reject(reject.id, {
                reason: reject.reason,
            });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async createAccountStep1(info, callback) {
        let infor = new schema_1.CreateAccountStep1(info).getJson();
        try {
            let res = await this.stripe.accounts.create({
                ...info,
                business_profile: {
                    mcc: "4722",
                    url: "http://noweb.com",
                },
            });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async createAccountStep2(individual, accountId, callback) {
        try {
            let res = await this.stripe.accounts.update(accountId, { individual });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async createAccountStep3(info, accountId, callback) {
        try {
            let res = await this.stripe.accounts.update(accountId, { individual: { address: info } });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    async createBankAccountToken(info, callback) {
        try {
            let re = await this.stripe.tokens.create({
                bank_account: info
            });
            callback(undefined, re);
        }
        catch (error) {
            callback(error);
        }
    }
    async createBankAccount(accountId, tokenId, callback) {
        try {
            let re = await this.stripe.accounts.createExternalAccount(accountId, {
                external_account: tokenId,
            });
            callback(undefined, re);
        }
        catch (error) {
            callback(error);
        }
    }
    async updateConnectAccount(accountId, tokenId, callback) {
        try {
            let res = await this.stripe.accounts.update(accountId, {
                account_token: tokenId
            });
            callback(undefined, res);
        }
        catch (error) {
            callback(error);
        }
    }
    checkStripeAccountWithEmail(email, accountId) {
        return new Promise((resolve, reject) => {
            this.checkStripeAccoun(email, accountId, (er, res) => {
                er && er.raw.code !== "account_already_exists" ?
                    reject({ error: er, errorMsg: "" }) :
                    er && er.raw.code === "account_already_exists" ?
                        this.createLoginPageLink(accountId, (er1, res1) => {
                            er1 ?
                                reject({ error: er1, errorMsg: "" }) :
                                resolve(res1);
                        }) :
                        resolve(res);
            });
        });
    }
    createAccount(profile) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(profile.userId, (er, res1) => {
                er ?
                    reject({ error: er, errorMsg: "Database Error" }) :
                    res1 ?
                        reject({ error: "", errorMsg: "Connected Account is exist to this user" }) :
                        this.connectedAccount.create({ userId: profile.userId, }, (er2, res3) => {
                            er2 ?
                                reject({ error: er2, errorMsg: "error in create stripe account" }) :
                                resolve(res3);
                        });
            });
        });
    }
    findAccount(userId) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(userId, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Database Error" }) :
                    res ?
                        resolve(res) :
                        reject({ error: "", errorMsg: "Connected Account not exist" });
            });
        });
    }
    completeAccount(userId) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(userId, (er1, res) => {
                er1 ?
                    reject({ error: er1, errorMsg: "Database Error" }) :
                    res
                        ? this.connectedAccount.complitedStripeConnectedAccountWithUserIdAccountId(userId, (er, res) => {
                            er ?
                                reject({ error: er, errorMsg: "Database Error" }) :
                                resolve(res);
                        })
                        : reject({ error: "", errorMsg: "Connected Account not exist" });
            });
        });
    }
    async createAccountLink(userId) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(userId, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Database Error" }) :
                    res
                        ? this.createAccountLinkByConnectedAccountId(res.accountId, userId, (er1, accountLink) => {
                            er1 ?
                                reject({ error: er1, errorMsg: "Stripe Error !" }) :
                                resolve(accountLink);
                        })
                        : reject({ error: "", errorMsg: "Connected Account not exist" });
            });
        });
    }
    allConnectedAccount() {
        return new Promise((resolve, reject) => {
            this.allAccounts((er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Stripe Error !" }) :
                    resolve(res);
            });
        });
    }
    deleteConnectedAccount(id) {
        return new Promise((resolve, reject) => {
            this.deleteAccounts(id, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Stripe Error !" }) :
                    resolve(res);
            });
        });
    }
    rejectConnectedAccount(info) {
        return new Promise((resolve, reject) => {
            this.rejectAccounts(info, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: "Stripe Error !" }) :
                    resolve(res);
            });
        });
    }
    step1(info, userId) {
        return new Promise((resolve, reject) => {
            let st1 = new schema_1.CreateAccountStep1(info).getJson();
            this.createAccountStep1(st1, (er, acc) => {
                er ? reject({ error: er, errorMsg: "Stripe Error !" }) :
                    this.connectedAccount.updateStripeAccountId(acc.id, userId, (er1, res) => {
                        er1 ?
                            reject({ error: er1, errorMsg: "Stripe Error !" }) :
                            resolve(res);
                    });
            });
        });
    }
    updateAccount(userId, tokenId) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(userId, (er, account) => {
                er ?
                    reject({ error: er, errorMsg: "Stripe Error !" }) :
                    this.updateConnectAccount(account.accountId, tokenId, (er1, res) => {
                        er1 ?
                            reject({ error: er1, errorMsg: "Stripe Error !" }) :
                            resolve(res);
                    });
            });
        });
    }
    bankConnectAccount(userId, tokenId) {
        return new Promise((resolve, reject) => {
            this.connectedAccount.findStripeConnectedAccountWithUserId(userId, (er, account) => {
                er ?
                    reject({ error: er, errorMsg: "Stripe Error !" }) :
                    this.createBankAccount(account.accountId, tokenId, (er1, res) => {
                        er1 ?
                            reject({ error: er1, errorMsg: "Stripe Error !" }) :
                            resolve(res);
                    });
            });
        });
    }
}
exports.StripeAccountManager = StripeAccountManager;
