import { Application, Request, Response, Router, NextFunction } from 'express'
import { ValidationPolicy } from './policy/validationPolicy'
import { validator } from '../middleware'
import { AccessPolicy } from './policy/accessPolicy'
export class BaseRouter {
    router: Router
    controller: any
    constructor(controller) {
        this.controller = new controller()
        this.router = Router()
    }

    init(validationRule: ValidationPolicy = new ValidationPolicy(), accessPolicy: AccessPolicy = new AccessPolicy()) {
        let urls = {
            get: "/",
            getById: "/id/:id",
            post: "/",
            put: "/",
            delete: "/"
        }

        this.router.route(urls.post)
            .post(accessPolicy.insert, validationRule.insert, validator,
                (req: Request, res: Response, next: NextFunction) => { this.add(req, res, next) })

        this.router.route(urls.put)
            .put(accessPolicy.update, validationRule.update, validator,
                (req: Request, res: Response, next: NextFunction) => { this.update(req, res, next) })

        this.router.route(urls.delete)
            .delete(accessPolicy.delete, validationRule.delete, validator,
                (req: Request, res: Response, next: NextFunction) => { this.delete(req, res, next) })

        this.router.route(urls.get)
            .get(accessPolicy.get, validationRule.get, validator,
                (req: Request, res: Response, next: NextFunction) => { this.findAll(req, res, next) })

        this.router.route(urls.getById)
            .get(accessPolicy.getById, validationRule.getById, validator,
                (req: Request, res: Response, next: NextFunction) => { this.findOne(req, res, next) })
    }
    private add(req: Request, res: Response, next: NextFunction) { this.controller.add(req, res, next) }
    private update(req: Request, res: Response, next: NextFunction) { this.controller.update(req, res, next) }
    private delete(req: Request, res: Response, next: NextFunction) { this.controller.delete(req, res, next) }
    private findOne(req: Request, res: Response, next: NextFunction) { this.controller.findOne(req, res, next) }
    private findAll(req: Request, res: Response, next: NextFunction) { this.controller.findAll(req, res, next) }
}