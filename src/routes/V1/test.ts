import { NextFunction, Request, Response, Router } from 'express';
import testController from '../../controllers/testController'
import { BaseRouter } from '../../repository/BaseRouter'
import { jwtCheck } from '../../middleware'
class TestRoutes extends BaseRouter {

   constructor() {
      super(testController)
      this.init()
   }

   init() {
      super.init()
      this.router.route('/jwt').get((req: Request, res: Response, next: NextFunction) => {
         this.jwt(req, res, next)
      })
      this.router.route('/check-jwt').get(jwtCheck, (req: Request, res: Response, next: NextFunction) => {
         this.checkJwt(req, res, next)
      })

   }

   jwt = (req: Request, res: Response, next: NextFunction) => {
      this.controller.generateJWT(req, res, next)
   }
   checkJwt = (req: Request, res: Response, next: NextFunction) => {
      this.controller.checkJWT(req, res, next)
   }

}

export default new TestRoutes().router