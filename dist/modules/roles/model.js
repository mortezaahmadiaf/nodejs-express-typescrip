"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const schema_1 = require("./schema");
class RoleModel {
    constructor() {
        this.role = schema_1.Roles;
    }
    async deleteRole(id, callback) {
        try {
            let result = await this.role.destroy({ where: { id } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async saveRole(params, callback) {
        try {
            let result = await this.role.create(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateRole(params, callback) {
        try {
            let result, role = await this.role.findOne({ where: { id: params.id } });
            result = await role.update(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findAllRoles(callback) {
        try {
            let result = await this.role.findAll();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limiteCountRoles(params, callback) {
        try {
            let result = await this.role.findAndCountAll({
                ...params,
                order: [["id", "ASC"]],
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneRoleById(id, callback) {
        try {
            let result = await this.role.findOne({ where: { id } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.RoleModel = RoleModel;
