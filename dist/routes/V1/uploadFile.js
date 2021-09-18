"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const jwt_1 = require("../../middleware/jwt");
const express_1 = require("express");
const multer = require("multer");
const uploadFileController_1 = require("../../controllers/uploadFileController");
const crypto_1 = require("../../script/crypto");
class UploadFile {
    constructor() {
        this.storage = multer.diskStorage({
            destination: (a, b, cd) => {
                cd(null, './files/file');
            },
            filename: (req, file, cd) => {
                let name = crypto_1.genRandomString({ stringLength: 16 });
                let ft = file.originalname.split('.');
                let filetype = ft[ft.length - 1];
                name ? cd(null, name + '.' + filetype) : cd(new Error('file upload error'), null);
            },
        });
        this.profileStorage = multer.diskStorage({
            destination: (a, b, cd) => {
                cd(null, './files/profile');
            },
            filename: (c, file, cd) => {
                let name = crypto_1.genRandomString({ stringLength: 16 });
                let ft = file.originalname.split('.');
                let filetype = ft[ft.length - 1];
                name ? cd(null, name + '.' + filetype) : cd(new Error('file upload error'), null);
            }
        });
        this.upload = multer({ storage: this.storage, limits: {} }).single('file');
        this.uploadFiles = multer({ storage: this.storage, limits: {} }).array('files', 4);
        this.progileImage = multer({ storage: this.profileStorage, limits: {} }).single('file');
        this.controller = new uploadFileController_1.default();
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.route('/').post(jwt_1.default, this.upload, (request, response, next) => {
            this.file(request, response, next);
        });
        this.router.route('/profile').post(this.progileImage, (request, response, next) => {
            this.profile(request, response, next);
        });
        this.router.route('/files').post(jwt_1.default, this.uploadFiles, (request, response, next) => {
            this.files(request, response, next);
        });
        this.router.route('/base64').post((request, response, next) => {
            this.base64(request, response, next);
        });
    }
    file(request, response, next) { this.controller.uploadimage(request, response); }
    profile(request, response, next) { this.controller.uploadProfileImage(request, response); }
    files(request, response, next) { this.controller.uploadImages(request, response); }
    base64(request, response, next) { this.controller.uploadImageBase64(request, response); }
}
const uploadFile = new UploadFile().router;
exports.uploadFile = uploadFile;
