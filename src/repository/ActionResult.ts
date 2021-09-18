
import { HTTPStatusCode } from "./HttpStatusCode";
import { Response } from "express";
export function RejectHandler(
    reject: Function,
    error: any,
    errMessage: string = "Internal server error",
    statusCode: number = HTTPStatusCode.InternalServerError): void {
    reject({
        error,
        statusCode,
        errMessage
    })
}

export function ResponseHandler(
    res: Response,
    data: any,
    err,

): void {
    let errMessage = err && err.errMessage ? err.errMessage : null,
        error = err && err.error ? err.error : null,
        code = err && err.statusCode ?
            err.statusCode : 200;



    if (Array.isArray(err) && err.length > 0) {
        errMessage = err[0] && err[0].msg ? err[0].msg : "invalid type";
        code = HTTPStatusCode.UnprocessableEntity;
        error = err;
    }
    res.status(code).send({
        status: code,
        error: error,
        errMessage: errMessage,
        payload: {
            data: data ? data : null,

        }
    });
}

