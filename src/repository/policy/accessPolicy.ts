import { NextFunction } from "express";

export class AccessPolicy {
    constructor() {
    }
    public get: any = (req: Request, res: Response, next: NextFunction) => { next(); };
    public getById: any = (req: Request, res: Response, next: NextFunction) => { next(); };
    public insert: any = (req: Request, res: Response, next: NextFunction) => { next(); };
    public update: any = (req: Request, res: Response, next: NextFunction) => { next(); };
    public delete: any = (req: Request, res: Response, next: NextFunction) => { next(); };
}
