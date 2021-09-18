"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsers = void 0;
const schema_1 = require("./schema");
const schema_2 = require("../roles/schema");
class AdminUsers {
    constructor() {
        this.user = schema_1.Adminpanel_user;
    }
    async saveUser(info, callback) {
        try {
            let res = await this.user.create(info);
            callback(null, res);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deleteOne(id, calback) {
        try {
            let result = await this.user.destroy({ where: { id } });
            calback(null, result);
        }
        catch (error) {
            calback(error, null);
        }
    }
    async findUserById(id, callback) {
        try {
            let user = await this.user.findOne({ where: { id } });
            callback(null, user);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allusers(callback) {
        try {
            let result = await schema_1.Adminpanel_user.findAll({
                include: {
                    model: schema_2.Roles
                }
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limitCountOfUsers(params, callback) {
        try {
            let result = await schema_1.Adminpanel_user.findAndCountAll({
                ...params,
                order: [['id', 'ASC']],
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserByEmail(email, callback) {
        try {
            let result = await this.user.findOne({
                where: {
                    email
                }
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUsersByIdWithRole(id, callback) {
        try {
            let user = await this.user.findOne({ where: { id }, include: { model: schema_2.Roles } });
            callback(null, user);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allusersWithRoles(callback) {
        try {
            let result = await schema_1.Adminpanel_user.findAll({
                include: {
                    model: schema_2.Roles
                }
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limitCountOfUsersWithRoles(params, callback) {
        try {
            let result = await schema_1.Adminpanel_user.findAndCountAll({
                ...params,
                order: [['id', 'ASC']],
                include: { model: schema_2.Roles }
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async changeUserPassword(params, callback) {
        try {
            let user = await this.user.findOne({ where: { id: params.id } });
            let result = await user.update(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneAndUpdate(info, callback) {
        try {
            let user = await this.user.findOne({ where: { id: info.id } });
            let result = await user.update(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserByEmailWithRole(email, callback) {
        try {
            let result = await this.user.findOne({
                where: {
                    email
                },
                include: {
                    model: schema_2.Roles
                }
            });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserByIdWithRole(id, callback) {
        try {
            let user = await this.user.findOne({ where: { id },
                include: {
                    model: schema_2.Roles
                } });
            callback(null, user);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.AdminUsers = AdminUsers;
