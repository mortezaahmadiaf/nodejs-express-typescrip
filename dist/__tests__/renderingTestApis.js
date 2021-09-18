"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestApi = void 0;
require("mocha");
const server = "http://localhost:4000";
const Test_1 = require("./Test");
const chalk = require("chalk");
const defaultExpect_1 = require("./defaultExpect");
const dotenv = require("dotenv");
dotenv.config();
before(async () => {
    console.log('before function : [LoginToGetCookie]');
});
after(async () => {
    console.log('after function : [remove cookie from env]');
});
const TestApi = (data) => {
    return describe(`${chalk.bgBlue('------------')} ${chalk.yellow(data.describe.toUpperCase())} ${chalk.bgBlue('------------')}`, () => {
        data.its.map((eatchTest) => {
            it(eatchTest.description, (done) => {
                Test_1.default[eatchTest.method]({
                    url: `${server}${eatchTest.url}`,
                    payload: eatchTest.payload,
                    end: done,
                    needAuthentication: !eatchTest['needAuthentication'] ? false : eatchTest['needAuthentication'],
                    response: eatchTest.returnResponseOk === true ?
                        [...defaultExpect_1.expectedOk, ...eatchTest.expectedResponse] :
                        eatchTest.returnResponseOk === false ? [...defaultExpect_1.expectedError, ...eatchTest.expectedResponse] :
                            eatchTest.expectedResponse
                });
            });
        });
    });
};
exports.TestApi = TestApi;
