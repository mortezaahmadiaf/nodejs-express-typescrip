import { Request, Response, NextFunction } from 'express'
import { sendError } from '../script'
export const bruteForce = async (request: Request, response: Response, next: NextFunction) => {

    // console.log({ clientIp: request.clientIp, ip: request.ip, ips: request.ips, request: request })
    // let id = request.ip
    // let record = await mongo.bruteForce.findOne({ id })
    // if (record === null) {
    //     await mongo.bruteForce.createIndex({ expireDate: 1 }, { expireAfterSeconds: 1 })
    //     await mongo.bruteForce.insertOne({ id, count: 1, expireDate: new Date(new Date(new Date()).getTime() + 60 * 2 * 1000) })
    //     next()
    // }
    // else if (record.count + 1 < 10) {
    //     await mongo.bruteForce.findOneAndUpdate({ id }, { $set: { count: record.count + 1 } })
    //     next()
    // }
    // else {
    //     sendError({ response, message: { error: "You've made too many failed attempts in a short period of time, please try again afetr 1 day" }, status: 423 })
    // }

}