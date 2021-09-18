"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobCategoryModel = void 0;
const schema_1 = require("./schema");
class JobCategoryModel {
    constructor() {
        this.category = schema_1.Jobcategory;
    }
    async saveJobCategory(info, callback) {
        try {
            let result = await this.category.create(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateJobCategory(info, callback) {
        try {
            let job = await this.category.findOne({ where: { id: info.id } });
            let result = await job.update(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deleteJobCategory(id, callback) {
        try {
            let result = await this.category.destroy({ where: { id } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allJobsCategory(callback) {
        try {
            let result = await this.category.findAll();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limiteJobCategory(info, callback) {
        try {
            let result = await this.category.findAndCountAll(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobCategoryById(id, callback) {
        try {
            let result = await this.category.findOne({ where: { id } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobCategoryByName(name, callback) {
        try {
            let result = await this.category.findOne({ where: { name } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.JobCategoryModel = JobCategoryModel;
