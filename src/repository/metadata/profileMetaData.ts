import { body, check } from "express-validator";

export class Profile {
    public id: string = "";
    public userId: string = "";
    public firstName: string = "";
    public lastName: string = ''

}

export class ProfileValidate {
    constructor() { }
    static id: any = body('id').exists().notEmpty().isUUID().withMessage('Not valid id');
    static userId: any = body('userI').exists().notEmpty().isUUID().withMessage('Not valid userId');
    static firstName: any = body('firstName').exists().notEmpty().isString().withMessage('Not valid firstName');
    static lastName: any = body('larstName').exists().notEmpty().isString().withMessage('Not valid larstName');


}