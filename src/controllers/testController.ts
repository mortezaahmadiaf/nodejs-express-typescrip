// import { Get, Route ,Controller} from "tsoa";
import { Response, Request, NextFunction } from 'express'
import { sendResult } from "../script";
// @Route("/test")
export default class PingController {
  //  ___________________________________________________________________________________________________________________________________



  add(req: Request, response: Response, next: NextFunction) { sendResult({ response, message: { test: "add" } }) }
  update(req: Request, response: Response, next: NextFunction) { sendResult({ response, message: { test: "update" } }) }
  delete(req: Request, response: Response, next: NextFunction) { sendResult({ response, message: { test: "delete" } }) }
  findOne(req: Request, response: Response, next: NextFunction) { sendResult({ response, message: { test: "findOne" } }) }
  findAll(req: Request, response: Response, next: NextFunction) { sendResult({ response, message: { test: "findAll" } }) }
  //  ___________________________________________________________________________________________________________________________________

}