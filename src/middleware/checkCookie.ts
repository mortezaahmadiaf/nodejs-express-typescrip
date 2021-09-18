import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { sendError } from '../script'

export const verifyTokenInCoockie = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.token || undefined
    try {
        if (!token)
            sendError({ response, message: 'login require', status: 401 })
        let decrypt = await jwt.verify(token, process.env.JWT_TOKEN_SECURE_STRING)
        request['STUser'] = {
            id: decrypt['id']

        }
        next()
    } catch (error) {
        console.log('error')
        sendError({ response, message: 'somethink went wrongd' })
    }
}