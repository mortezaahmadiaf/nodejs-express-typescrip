"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
class ContactUsModel {
    async saveContact(params, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.insertOne(params);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateContactAnswerAndSeeToTrue(_id, answer, callback) {
        try {
            let result = await (await mongoDbHelper_1.default.contactUs.findOneAndUpdate({ _id }, { $set: { see: true, answer } })).value;
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneContactById(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.findOne({ _id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateUserContactSeeToTrue(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.updateMany({ userId }, { $set: { see: true } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findUserAllContactByUserId(id, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.find({ id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findNotCheckedUserAllContactByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.find({ userId, see: false }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async finAllContact(callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.find().toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limitCountContact(params, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs
                .find()
                .limit(params.limit)
                .skip(params.offset)
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async finAllContactNotChecked(callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.find({ see: false }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async finAllContactChecked(callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.find({ see: true }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async filterAllContactChecked(ticket, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs
                .find({ see: true, ticket: { $regex: ticket } })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async delete(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.contactUs.deleteOne({ _id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.ContactUsModel = ContactUsModel;
