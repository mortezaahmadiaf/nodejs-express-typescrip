"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJob = exports.Job = void 0;
const script_1 = require("../../script");
class Job {
    constructor(info) {
        this.userId = info.userId;
        this._id = info._id;
        this.categoryId = info.categoryId;
        this.description = info.description;
        this.deviceToken = info.deviceToken;
        this.endDate = info.endDate ? info.endDate : info.expireDate;
        this.expireDate = info.expireDate;
        this.images = info.images ? info.images : [];
        this.address = info.address ? info.address : '';
        this.title = info.title;
        this.payment = info.payment;
        this.skills = info.skills ? info.skills : [];
        this.startDate = info.startDate;
        this.startTime = info.startTime;
        this.location = { lat: info.location.lat, lng: info.location.lng };
        this.locationId = info.locationId;
        this.assignTo = '';
        this.rated = false;
        this.cityName = info.cityName;
        this.paymentType = 'cash';
        this.paymentStatus = false;
        this.jobCode = `JOBEE-${script_1.genRandomString({ stringLength: 12 }).toUpperCase()}`;
    }
    getJson() {
        return {
            _id: this._id,
            address: this.address,
            categoryId: this.categoryId,
            description: this.description,
            deviceToken: this.deviceToken,
            endDate: this.endDate,
            expireDate: this.expireDate,
            location: this.location,
            locationId: this.locationId,
            payment: this.payment,
            startDate: this.startDate,
            startTime: this.startTime,
            title: this.title,
            userId: this.userId,
            images: this.images,
            skills: this.skills,
            rated: this.rated,
            status: 'new',
            assignTo: this.assignTo,
            cityName: this.cityName.toLowerCase(),
            paymentStatus: this.paymentStatus,
            paymentType: this.paymentType,
            jobCode: this.jobCode
        };
    }
}
exports.Job = Job;
class UpdateJob {
    constructor(info) {
        this.categoryId = info.categoryId;
        this.description = info.description;
        this.endDate = info.endDate ? info.endDate : info.expireDate;
        this.expireDate = info.expireDate;
        this.images = info.images ? info.images : [];
        this.address = info.address ? info.address : '';
        this.title = info.title;
        this.payment = info.payment;
        this.skills = info.skills ? info.skills : [];
        this.startDate = info.startDate;
        this.startTime = info.startTime;
        this.location = { lat: info.location.lat, lng: info.location.lng };
        this.locationId = info.locationId;
    }
    getJson() {
        return {
            address: this.address,
            categoryId: this.categoryId,
            description: this.description,
            endDate: this.endDate,
            expireDate: this.expireDate,
            location: this.location,
            locationId: this.locationId,
            payment: this.payment,
            startDate: this.startDate,
            startTime: this.startTime,
            title: this.title,
            images: this.images,
            skills: this.skills,
        };
    }
}
exports.UpdateJob = UpdateJob;
