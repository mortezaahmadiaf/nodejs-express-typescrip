"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
const schema_1 = require("./schema");
class PermissionModel {
    constructor() {
        this.permision = schema_1.Permissions;
    }
    async updatePermisson(params, callback) {
        try {
            let result, permission = await this.permision.findOne({ where: { id: params.id } });
            result = await permission.update(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deletePermission(params, callback) {
        try {
            let result = await this.permision.destroy({ where: { id: params } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async savePermisson(params, callback) {
        try {
            let result = await this.permision.create(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allPermisson(callback) {
        try {
            let result = await this.permision.findAll({});
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limitCountPermisson(params, callback) {
        try {
            let result = await this.permision.findAndCountAll({
                limit: params.limit,
                offset: params.offset,
                order: [["id", "ASC"]],
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findPermissonsByIds(id, callback) {
        try {
            let result = await this.permision.findAll({
                where: { id },
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOnePermissonById(id, callback) {
        try {
            let permission = await this.permision.findOne({
                where: { id },
            });
            callback(null, permission);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.PermissionModel = PermissionModel;
