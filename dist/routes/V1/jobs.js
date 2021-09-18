"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobs = void 0;
const middleware_1 = require("../../middleware");
const express_1 = require("express");
const validator_1 = require("../validator");
const jobsController_1 = require("../../controllers/jobsController");
const middleware_2 = require("../../middleware");
class Jobs {
    constructor() {
        this.controller = new jobsController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(middleware_1.jwtCheck, validator_1.insertJob, middleware_1.validation, (request, response, next) => {
            this.add(request, response, next);
        });
        this.router.route('/').put(middleware_1.jwtCheck, validator_1.insertJob, middleware_1.validation, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/apply').post(middleware_1.jwtCheck, validator_1.applyJob, middleware_1.validation, (request, response, next) => {
            this.apply(request, response, next);
        });
        this.router.route('/category').post(middleware_1.jwtCheck, validator_1.category, middleware_1.validation, (request, response, next) => {
            this.addCategory(request, response, next);
        });
        this.router.route('/category').put(middleware_1.jwtCheck, validator_1.categoryUpdate, middleware_1.validation, (request, response, next) => {
            this.update(request, response, next);
        });
        this.router.route('/finished').post(middleware_1.jwtCheck, validator_1.endJob, middleware_1.validation, (request, response, next) => {
            this.finished(request, response, next);
        });
        this.router.route('/rating/poster').post(middleware_1.jwtCheck, validator_1.rating, middleware_1.validation, (request, response, next) => {
            this.posterRating(request, response, next);
        });
        this.router.route('/rating/worker').post(middleware_1.jwtCheck, validator_1.rating, middleware_1.validation, (request, response, next) => {
            this.workerRating(request, response, next);
        });
        this.router.route('/filter').post(middleware_1.jwtCheck, middleware_2.checkJobsPermission, (request, response, next) => {
            this.filter(request, response, next);
        });
        this.router.route('/user-accepted/:jobId').get(middleware_1.jwtCheck, validator_1.jobId, middleware_1.validation, (request, response, next) => {
            this.userAccepted(request, response, next);
        });
        this.router.route('/category/all').get(middleware_1.jwtCheck, (request, response, next) => {
            this.findAllCategory(request, response, next);
        });
        this.router.route('/category').get(middleware_1.jwtCheck, middleware_2.checkJobCategoryPermission, (request, response, next) => {
            this.category(request, response, next);
        });
        this.router.route('/user-rate/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.userRate(request, response, next);
        });
        this.router.route('/category/:page/:countPerPage').get(middleware_1.jwtCheck, middleware_2.checkJobCategoryPermission, validator_1.pagination, middleware_1.validation, (request, response, next) => {
            this.categoryPagination(request, response, next);
        });
        this.router.route('/user/:userId').get(middleware_1.jwtCheck, validator_1.userId, middleware_1.validation, (request, response, next) => {
            this.userJob(request, response, next);
        });
        this.router.route('/location/:locationId').get(middleware_1.jwtCheck, validator_1.locationId, middleware_1.validation, (request, response, next) => {
            this.findByLocationId(request, response, next);
        });
        this.router.route('/city/:cityName').get(middleware_1.jwtCheck, (request, response, next) => {
            this.findByCityName(request, response, next);
        });
        this.router.route('/applied/:jobId').get(middleware_1.jwtCheck, validator_1.jobId, middleware_1.validation, (request, response, next) => {
            this.applied(request, response, next);
        });
        this.router.route('/detail/:jobId').get(middleware_1.jwtCheck, validator_1.jobId, middleware_1.validation, (request, response, next) => {
            this.detail(request, response, next);
        });
        this.router.route('/category').delete(middleware_1.jwtCheck, middleware_2.checkJobCategoryPermission, (request, response, next) => {
            this.deleteCategory(request, response, next);
        });
        this.router.route('/:page/:countPerPage').get(middleware_1.jwtCheck, middleware_2.checkJobsPermission, validator_1.pagination, middleware_1.validation, (request, response, next) => {
            this.pagination(request, response, next);
        });
        this.router.route('/').delete(middleware_1.jwtCheck, (request, response, next) => {
            this.delete(request, response, next);
        });
        this.router.route('/all').get(middleware_1.jwtCheck, middleware_2.checkJobsPermission, (request, response, next) => {
            this.findAll(request, response, next);
        });
    }
    add(request, response, next) {
        this.controller.insertJob(request, response);
    }
    update(request, response, next) {
        this.controller.updateJob(request, response);
    }
    delete(request, response, next) {
        this.controller.deleteJob(request, response);
    }
    apply(request, response, next) {
        this.controller.applyJob(request, response);
    }
    addCategory(request, response, next) {
        this.controller.jobsCategory(request, response);
    }
    updateCategory(request, response, next) {
        this.controller.updateJobsCategory(request, response);
    }
    deleteCategory(request, response, next) {
        this.controller.deleteJobCategory(request, response);
    }
    posterRating(request, response, next) {
        this.controller.ratingToJobPoster(request, response);
    }
    workerRating(request, response, next) {
        this.controller.ratingToWorker(request, response);
    }
    pagination(request, response, next) {
        this.controller.jobsToPagination(request, response);
    }
    categoryPagination(request, response, next) {
        this.controller.jobsCategoryToPagination(request, response);
    }
    detail(request, response, next) {
        this.controller.jobDetails(request, response);
    }
    findAll(request, response, next) {
        this.controller.getAllJobs(request, response);
    }
    findAllCategory(request, response, next) {
        this.controller.allJobsCategory(request, response);
    }
    applied(request, response, next) {
        this.controller.allUserapplidThisJob(request, response);
    }
    findByCityName(request, response, next) {
        this.controller.getJobByCityName(request, response);
    }
    findByLocationId(request, response, next) {
        this.controller.getJobByLocation(request, response);
    }
    userRate(request, response, next) {
        this.controller.getUserRate(request, response);
    }
    userAccepted(request, response, next) {
        this.controller.getUserAccepted(request, response);
    }
    filter(request, response, next) {
        this.controller.filter(request, response);
    }
    finished(request, response, next) {
        this.controller.finishedJobWithJobPoster(request, response);
    }
    userJob(request, response, next) {
        this.controller.getUserJob(request, response);
    }
    category(request, response, next) {
        this.controller.allJobsCategory(request, response);
    }
}
const jobs = new Jobs().router;
exports.jobs = jobs;
