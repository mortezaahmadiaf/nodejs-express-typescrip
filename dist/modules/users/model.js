"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const schema_1 = require("./schema");
const schema_2 = require("../profile/schema");
class UserModel {
    constructor() {
        this.user = schema_1.Users;
    }
    async deleteUser(id, callback) {
        try {
            let res = await this.user.destroy({ where: { id } });
            callback(null, res);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserById(id, callback) {
        try {
            let user = await this.user.findOne({ where: { id } });
            callback(null, user);
        }
        catch (error) {
        }
    }
    async findUserByPhone(phoneInfo, callback) {
        try {
            let user = await this.user.findOne({
                where: { ...phoneInfo }
            });
            callback(null, user);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserByIdWithProfile(id, callback) {
        try {
            let user = await this.user.findOne({
                where: { id }, include: [
                    {
                        model: schema_2.Profile,
                        as: 'profile'
                    }
                ]
            });
            callback(null, user);
        }
        catch (error) {
            callback(error);
        }
    }
    async findUserByPhoneWithProfile(phoneInfo, callback) {
        try {
            let user = await this.user.findOne({
                where: { ...phoneInfo },
                include: [
                    {
                        model: schema_2.Profile,
                        as: 'profile'
                    }
                ]
            });
            callback(null, user);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async save(info, callback) {
        try {
            let result = await this.user.create(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updatePassword(info, callback) {
        try {
            let result, user = await this.user.findOne({ where: { id: info.id }, });
            result = await user.update(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.UserModel = UserModel;
