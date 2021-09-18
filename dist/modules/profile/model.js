"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = void 0;
const schema_1 = require("./schema");
class ProfileModel {
    constructor() {
        this.profile = schema_1.Profile;
    }
    async saveProfile(params, callback) {
        try {
            let result = await this.profile.create(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateProfile(params, callback) {
        try {
            let result, pro = await this.profile.findOne({ where: { id: params.id } });
            result = await pro.update({ ...params });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findProfileById(id, callback) {
        try {
            let result = await this.profile.findOne({ where: { id } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findProfileByUserId(userId, callback) {
        try {
            let result = await this.profile.findOne({ where: { userId } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.ProfileModel = ProfileModel;
