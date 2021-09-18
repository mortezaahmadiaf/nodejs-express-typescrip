import { Request, Response, Router, NextFunction } from 'express';
import profileController from '../../controllers/profileController'
import { BaseRouter } from '../../repository/BaseRouter'
import * as _ from 'lodash'
class Profile extends BaseRouter {
    constructor() {
        super(profileController)
        this.init()
    }

    init() {
        super.init()
    }
}

const profile = new Profile().router
export { profile }
