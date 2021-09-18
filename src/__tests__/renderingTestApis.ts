import "mocha";
const server = "http://localhost:4000";
import Test from "./Test";
import * as chalk from 'chalk'
import { TestApiI } from './__Test__schema__/interfaces'
import { expectedError, expectedOk } from './defaultExpect'
import * as dotenv from 'dotenv'
// import { getCookieFromLogin } from './getCookieFromLoginApi'
dotenv.config()



before(async () => {
    console.log('before function : [LoginToGetCookie]')
    // await getCookieFromLogin(server)
})
after(async () => {
    // process.env.TEST_COOKIE = ""
    console.log('after function : [remove cookie from env]')
})
export const TestApi = (data: TestApiI) => {
    return describe(`${chalk.bgBlue('------------')} ${chalk.yellow(data.describe.toUpperCase())} ${chalk.bgBlue('------------')}`,
        () => {
            data.its.map((eatchTest) => {
                it(eatchTest.description,
                    (done) => {
                        Test[eatchTest.method]({
                            url: `${server}${eatchTest.url}`,
                            payload: eatchTest.payload,
                            end: done,
                            needAuthentication: !eatchTest['needAuthentication'] ? false : eatchTest['needAuthentication'],
                            response: eatchTest.returnResponseOk === true ?
                                [...expectedOk, ...eatchTest.expectedResponse] :
                                eatchTest.returnResponseOk === false ? [...expectedError, ...eatchTest.expectedResponse] :
                                    eatchTest.expectedResponse
                        })
                    })
            })
        })
}
