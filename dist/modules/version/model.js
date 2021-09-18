"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
class default_1 {
    constructor() {
        this.version = schema_1.Version;
    }
    async save(version, callback) {
        try {
            let result = await this.version.create({ version });
            callback(undefined, result);
        }
        catch (error) {
            callback(error, undefined);
        }
    }
    async updateVersion(version, callback) {
        try {
            let vers = await this.version.findOne({ where: { id: 1 } });
            let result = await vers.update({ version });
            callback(undefined, result);
        }
        catch (error) {
            callback(error, undefined);
        }
    }
    async findVersion(callback) {
        try {
            let result = await this.version.findOne({ where: { id: 1 } });
            callback(undefined, result);
        }
        catch (error) {
            callback(error, undefined);
        }
    }
}
exports.default = default_1;
