import jwt from '../../middleware/jwt';
import { NextFunction, Request, Response, Router } from 'express';
import * as multer from 'multer';
import file from '../../controllers/uploadFileController'
import { genRandomString } from '../../script/crypto'
class UploadFile {
    private controller: file
    router: Router
    constructor() {
        this.controller = new file()
        this.router = Router()
        this.init()
    }
    init() {
        // Singel image upload
        this.router.route('/').post(jwt, this.upload, (request: Request, response: Response, next: NextFunction) => {
            this.file(request, response, next)
        });
        // Upload Profile image
        this.router.route('/profile').post(this.progileImage, (request: Request, response: Response, next: NextFunction) => {
            this.profile(request, response, next)
        });
        // Multi image upload
        this.router.route('/files').post(jwt, this.uploadFiles, (request: Request, response: Response, next: NextFunction) => {
            this.files(request, response, next)
        });
        // Upload base64 image 
        this.router.route('/base64').post((request: Request, response: Response, next: NextFunction) => {
            this.base64(request, response, next)
        });
    }
    // Storage file in file folder _____________________________________________________________________________________________________________________________________________________

    private storage = multer.diskStorage({
        destination: (a, b, cd) => {
            cd(null, './files/file');
        },
        filename: (req, file, cd) => {
            let name = genRandomString({ stringLength: 16 })
            let ft = file.originalname.split('.');
            let filetype = ft[ft.length - 1];
            name ? cd(null, name + '.' + filetype) : cd(new Error('file upload error'), null)

        },
    });
    // Storage file in profile folder _____________________________________________________________________________________________________________________________________________________

    private profileStorage = multer.diskStorage({
        destination: (a, b, cd) => {
            cd(null, './files/profile');
        },
        filename: (c, file, cd) => {
            let name = genRandomString({ stringLength: 16 })
            let ft = file.originalname.split('.');
            let filetype = ft[ft.length - 1];
            name ? cd(null, name + '.' + filetype) : cd(new Error('file upload error'), null)

        }
    });

    // singel file in fild file Storage in file folder _____________________________________________________________________________________________________________________________________________________
    private upload = multer({ storage: this.storage, limits: {} }).single('file');
    // Max 4 files in fild files Storage in file folder _____________________________________________________________________________________________________________________________________________________
    private uploadFiles = multer({ storage: this.storage, limits: {} }).array('files', 4);
    // single file in fild file Storage in profile folder _____________________________________________________________________________________________________________________________________________________
    private progileImage = multer({ storage: this.profileStorage, limits: {} }).single('file');
    // _____________________________________________________________________________________________________________________________________________________

    private file(request: Request, response: Response, next: NextFunction) { this.controller.uploadimage(request, response) }
    private profile(request: Request, response: Response, next: NextFunction) { this.controller.uploadProfileImage(request, response) }
    private files(request: Request, response: Response, next: NextFunction) { this.controller.uploadImages(request, response) }
    private base64(request: Request, response: Response, next: NextFunction) { this.controller.uploadImageBase64(request, response) }
}
const uploadFile = new UploadFile().router
export { uploadFile }