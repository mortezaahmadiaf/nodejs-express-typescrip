import { body, check } from "express-validator";

export class ToDO {
    public _id: string = "";
    public toDo: string = "";
    public userId: string = ''
    public done: boolean = false;


}

export class ToDOValidate {
    constructor() { }
    static _id: any = body('_id').exists().notEmpty().isMongoId().withMessage('Not valid _id');
    static userId: any = body('userI').exists().notEmpty().isUUID().withMessage('Not valid userId');
    static toDo: any = body('toDo').exists().notEmpty().isString().withMessage('Not valid toDo');
    static done: any = body('done').exists().notEmpty().isBoolean().withMessage('Not valid done');


}