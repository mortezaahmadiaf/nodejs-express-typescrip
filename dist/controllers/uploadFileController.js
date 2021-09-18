"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const script_1 = require("../script");
const fs = require("fs");
class UploadFile {
    uploadimage(request, response) {
        script_1.sendResult({ response, message: request['file'].filename });
    }
    uploadProfileImage(request, response) {
        script_1.sendResult({ response, message: { fileName: request['file'].filename } });
    }
    uploadImageBase64(request, response) {
        let fileName = `${script_1.genRandomString({ stringLength: 16 })}.png`;
        try {
            const path = `./files/file/${fileName}`;
            const imagedate = request.body['file'];
            const base64Date = imagedate.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            fs.writeFileSync(path, base64Date, { encoding: 'base64' });
            script_1.sendResult({ response, message: fileName });
        }
        catch (error) {
            script_1.sendError({ response, message: error });
        }
    }
    uploadImages(request, response) {
        let files = request['files'];
        let filename = files.map((file) => file.filename);
        script_1.sendResult({ response, message: filename });
    }
}
exports.default = UploadFile;
