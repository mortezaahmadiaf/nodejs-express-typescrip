"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../middleware/jwt");
const crypto_1 = require("../../script/crypto");
const sendMessages_1 = require("../../script/sendMessages");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
class UploadFile {
    constructor() {
        this.preRoute = '/file-upload';
        this.storage = multer.diskStorage({
            destination: (a, b, cd) => {
                cd(null, './fileupload/file');
            },
            filename: (c, file, cd) => {
                let ft = file.originalname.split('.');
                let filetype = ft[ft.length - 1];
                crypto.randomBytes(16, (er, hash) => {
                    if (er) {
                        cd(er, null);
                    }
                    else {
                        cd(null, hash.toString('hex') + '.' + filetype);
                    }
                });
            }
        });
        this.profileStorage = multer.diskStorage({
            destination: (a, b, cd) => {
                cd(null, './fileupload/profile');
            },
            filename: (c, file, cd) => {
                let ft = file.originalname.split('.');
                let filetype = ft[ft.length - 1];
                crypto.randomBytes(16, (er, hash) => {
                    if (er) {
                        cd(er, null);
                    }
                    else {
                        cd(null, hash.toString('hex') + '.' + filetype);
                    }
                });
            }
        });
        this.upload = multer({ storage: this.storage, limits: {} }).single('file');
        this.uploadFiles = multer({ storage: this.storage, limits: {} }).array('files', 4);
        this.progileImage = multer({ storage: this.profileStorage, limits: {} }).single('profile');
    }
    route(app) {
        app.route(`${this.preRoute}`).post(jwt_1.default, this.upload, (request, response) => {
            sendMessages_1.sendResult({ response, message: request['file'].filename });
        });
        app.route(`${this.preRoute}/profile`).post(jwt_1.default, this.progileImage, (request, response) => {
            sendMessages_1.sendResult({ response, message: request['file'].filename });
        });
        app.route(`${this.preRoute}/files`).post(jwt_1.default, this.uploadFiles, (request, response) => {
            let files = request['files'];
            let filename = files.map((file) => file.filename);
            sendMessages_1.sendResult({ response, message: filename });
        });
        app.route(`${this.preRoute}/base64`).post((request, response) => {
            let fileName = `${crypto_1.genRandomString({ stringLength: 16 })}.png`;
            try {
                const path = `./fileupload/file/${fileName}`;
                const imagedate = request.body['file'];
                const base64Date = imagedate.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                fs.writeFileSync(path, base64Date, { encoding: 'base64' });
                sendMessages_1.sendResult({ response, message: fileName });
            }
            catch (error) {
                sendMessages_1.sendError({ response, message: error });
            }
        });
    }
}
exports.default = new UploadFile();
