// import {  Post, Route } from 'tsoa'
import {Request,Response} from 'express'
import { genRandomString, sendError, sendResult } from '../script';
import * as fs from 'fs'

// @Route('/file-upload')
export default class UploadFile{
    //  ___________________________________________________________________________________________________________________________________

    // @Post('/')
    public  uploadimage(request:Request,response:Response) {
        sendResult({response, message: request['file'].filename});

    }
    //  ___________________________________________________________________________________________________________________________________

    // @Post('/profile')
    public  uploadProfileImage(request:Request,response:Response) {
        sendResult({response, message:{fileName: request['file'].filename}});

    }
    //  ___________________________________________________________________________________________________________________________________

    // @Post('/base64')
    public  uploadImageBase64(request:Request,response:Response) {
        
        let fileName = `${
            genRandomString({stringLength: 16})
        }.png`;
        try {
            const path = `./files/file/${fileName}`;
            const imagedate = request.body['file'];
            const base64Date = imagedate.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            fs.writeFileSync(path, base64Date, {encoding: 'base64'});
            sendResult({response, message: fileName});
        } catch (error) {
            sendError({response, message: error});
        }
    }
    //  ___________________________________________________________________________________________________________________________________

    // @Post('/files')
    public  uploadImages(request:Request,response:Response) {
        let files: any = request['files'];
        let filename: any = files.map((file) => file.filename);
        sendResult({response, message: filename});
    }
    //  ___________________________________________________________________________________________________________________________________


} 