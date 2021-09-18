import { body, check } from "express-validator";

export class User {
    public id: string = "";
    public countryCode: string = "";
    public phone: number = 0;
    public password: string = ''
    public salt: string = ''

}

export class UserValidate {
    constructor() { }
    static id: any = body('id').exists().notEmpty().isUUID().withMessage('Not valid id');
    static countryCode: any = body('countryCode').exists().notEmpty().isString().isLength({ min: 1, max: 4 }).withMessage('Not valid countryCode');
    static phone: any = body('phone').exists().notEmpty().isMobilePhone('any').withMessage('Not valid phone');
    static password: any = body('password').exists().notEmpty().isStrongPassword({ minLength: 6 }).withMessage('Not valid password');


}