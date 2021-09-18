"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = void 0;
const mongoDbHelper_1 = require("../../config/mongoDbHelper");
const mongodb_1 = require("mongodb");
const script_1 = require("../../script");
class JobModel {
    async findUserFinishedJobsByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ userId, status: "done" })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async saveJob(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.insertOne(info);
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateJob(id, info, callback) {
        let _id = new mongodb_1.ObjectId(id);
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id, status: "new" }, { $set: info });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async updateJobRateToTrue(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: { rated: true } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async endPayment(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id: new mongodb_1.ObjectId(info.jobId) }, { $set: { paymentStatus: true, paymentType: info.paymentType, payId: info.payId } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async changeJobStatusNewToOnProcess(params, callback) {
        let _id = new mongodb_1.ObjectId(params._id);
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, { $set: { status: "onProcess", assignTo: params.assignTo } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async finishedJobByJobId(info, callback) {
        try {
            let result = await (await mongoDbHelper_1.default.jobs.findOneAndUpdate({
                _id: new mongodb_1.ObjectId(info.jobId),
                $nor: [{ status: "done" }, { status: "onProcess" }],
            }, { $set: { status: info.status, endDate: script_1.today() } })).value;
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async deleteJobById(_id, callback) {
        try {
            let result = mongoDbHelper_1.default.jobs.deleteOne({ _id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobsByLocationId(locationId, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ locationId, status: "new" })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobsByCityName(cityName, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ cityName, status: "new", expireDate: {
                    $gte: script_1.today()
                } })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findAllJobsByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.find({ userId }).toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findAllJobsByJobId(jobsIds, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ _id: { $in: jobsIds } })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findDoneStatusJobsByUserId(userId, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ userId, status: "done" })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async allJobs(callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.find().toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async limitCountJobs(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find()
                .limit(info.limit)
                .skip(info.offset)
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findTodayDoneJobsByJobsIds(jobIs, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ _id: { $in: jobIs }, status: "done", endDate: script_1.today() })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findAllDoneJobsByJobIds(jobIs, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ _id: { $in: jobIs }, status: "done" })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findLastWeekDoneJobs(_ids, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({
                _id: { $in: _ids },
                status: "done",
                endDate: { $gte: script_1.reportStartTime(7), $lt: script_1.today() },
            })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findCustomDateDoneJobs(date, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({
                _id: { $in: date._ids },
                status: "done",
                endDate: {
                    $gte: date.startDate,
                    $lt: date.endDate,
                },
            })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findOneJobById(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOne({ _id });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobsByIds(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ _id: { $in: _id } })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async assignJobToUser(info, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id: info._id }, { $set: { assignTo: info.assignTo } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async doneJobById(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOneAndUpdate({ _id }, { $set: { status: "done", endDate: script_1.today() } });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async checkDoneStatusJobById(_id, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs.findOne({ _id, status: "onProcess" });
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
    async findJobByJobCode(code, callback) {
        try {
            let result = await mongoDbHelper_1.default.jobs
                .find({ jobCode: { $regex: code } })
                .toArray();
            callback(null, result);
        }
        catch (error) {
            callback(error, null);
        }
    }
}
exports.JobModel = JobModel;
