import { NextFunction, Request, Response, Router } from 'express';
import testController from '../../controllers/testController'
import { BaseRouter } from '../../repository/BaseRouter'
class TestRoutes extends BaseRouter {

   constructor() {
      super(testController)
      this.init()
   }

   init() {
      super.init()
   }



}

export default new TestRoutes().router