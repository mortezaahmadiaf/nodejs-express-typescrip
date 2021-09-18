import { validator, jwtCheck } from '../../middleware';
import { Request, Response, Router, NextFunction } from 'express';
import { BaseRouter } from '../../repository/BaseRouter'
import UserController from '../../controllers/userController'
import { ValidationPolicy } from '../../repository/policy/validationPolicy'
import { add } from '../../repository/validation/userValidation'
import { AccessPolicy } from '../../repository/policy/accessPolicy'
class User extends BaseRouter {

    constructor() {
        super(UserController)
        this.init()

    }
    init() {
        let validationpolicy = new ValidationPolicy()
        let access = new AccessPolicy()
        access.insert = jwtCheck
        validationpolicy.insert = add

        super.init(validationpolicy, access)
        this.router.route('/change-pass').patch((request: Request, response: Response, next: NextFunction) => {
            this.changePass(request, response, next)
        })

    }

    private changePass(request: Request, response: Response, next: NextFunction) { this.controller.changePass(request, response, next) }





}
const user = new User().router
export { user }
