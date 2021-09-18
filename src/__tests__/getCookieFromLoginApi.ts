import * as dotenv from 'dotenv'
import * as superagent from 'superagent'
dotenv.config()


export const getCookieFromLogin = async (server: string) => {
    let response = await superagent.post(`${server}/users/login`)
        .set('X-API-KEY', 'foobar')
        .set('Accept', 'application/json')
        .send({
            userName: process.env.LOGIN_USERNAME,
            password: process.env.LOGIN_PASSWORD
        })
    process.env.TEST_COOKIE = response.headers['set-cookie']

}