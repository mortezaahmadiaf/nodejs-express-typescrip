"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superagent = require("superagent");
const chai_1 = require("chai");
require("mocha");
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");
class Test {
    static toProperty(body, functionName, value) {
        return chai_1.expect(body).to[functionName](value);
    }
    static toHaveProperty(body, property, value) {
        return chai_1.expect(body).to.have.property(property).to.equal(value);
    }
    static toNotHaveProperty(body, property, value) {
        return chai_1.expect(body).to.not.have.property(property).to.equal(value);
    }
    static toHaveOwnProperty(body, value) {
        return chai_1.expect(body).to.have.own.property(value);
    }
    static toNotHaveOwnProperty(body, value) {
        return chai_1.expect(body).to.not.have.own.property(value);
    }
    static toBeWithin(property, value) {
        return chai_1.expect(property).to.be.within(value[0], value[1]);
    }
    static toHave(body, property, value) {
        return chai_1.expect(body).to.have[property](value);
    }
    static toHaveNestedInclude(body, value) {
        return chai_1.expect(body).to.have.nested.include(value);
    }
    static toHaveNestedProperty(body, value) {
        return chai_1.expect(body).to.have.nested.property(value);
    }
    static toNestedInclude(body, value) {
        return chai_1.expect(body).to.nested.include(value);
    }
    static errToBeNull(err) {
        return chai_1.expect(err).to.be.null;
    }
    static post(params) {
        return new Promise((resolve, reject) => {
            superagent
                .post(params.url)
                .send(params.payload)
                .set("X-API-Key", "foobar")
                .set("Accept", "application/json")
                .set(params.needAuthentication && params.needAuthentication == true ? { "Cookie": process.env.TEST_COOKIE } : {})
                .end((error, res) => {
                console.log({ body: res.body });
                params.response.map((resp) => {
                    let property = _.get(res.body, resp.property, undefined);
                    this[resp.function](property, resp.value);
                });
                params.end();
            });
        });
    }
    static get(params) {
        return new Promise((resolve, reject) => {
            superagent
                .get(params.url)
                .query(params.query)
                .set("X-API-Key", "foobar")
                .set("Accept", "application/json")
                .set(params.needAuthentication && params.needAuthentication == true ? { "Cookie": process.env.TEST_COOKIE } : {})
                .end((error, res) => {
                console.log({ body: res.body });
                params.response.map((resp) => {
                    let property = _.get(res.body, resp.property, undefined);
                    this[resp.function](property, resp.value);
                });
                params.end();
            });
        });
    }
    static delete(params) {
        return new Promise((resolve, reject) => {
            superagent
                .delete(params.url)
                .send(params.payload)
                .set("X-API-Key", "foobar")
                .set("Accept", "application/json")
                .end((error, res) => {
                console.log({ body: res.body });
                params.response.map((resp) => {
                    let property = _.get(res.body, resp.property);
                    this[resp.function](property, resp.value);
                });
                params.end();
            });
        });
    }
    static put(params) {
        return new Promise((resolve, reject) => {
            superagent
                .put(params.url)
                .send(params.payload)
                .set("X-API-Key", "foobar")
                .set("Accept", "application/json")
                .end((error, res) => {
                console.log({ body: res.body });
                params.response.map((resp) => {
                    let property = _.get(res.body, resp.property);
                    this[resp.function](property, resp.value);
                });
                params.end();
            });
        });
    }
}
Test.toEqual = (property, value) => {
    return chai_1.expect(property).to.be.equal(value);
};
Test.toNotEqual = (property, value) => {
    return chai_1.expect(property).to.be.not.equal(value);
};
Test.toNotDeepEqual = (property, value) => {
    return chai_1.expect(property).to.not.deep.equal(value);
};
Test.toDeepEqual = (property, value) => {
    return chai_1.expect(property).to.deep.equal(value);
};
exports.default = Test;
