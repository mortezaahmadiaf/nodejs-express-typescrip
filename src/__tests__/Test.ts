import * as superagent from "superagent";
import { expect } from "chai";
import "mocha";
import * as dotenv from 'dotenv'
dotenv.config()
// import _.get from "lodash/get";

import * as _ from 'lodash'


class Test {
  static toProperty(body, functionName, value) {
    return expect(body).to[functionName](value);
  }
  static toHaveProperty(body, property, value) {
    return expect(body).to.have.property(property).to.equal(value);
  }
  static toNotHaveProperty(body, property, value) {
    return expect(body).to.not.have.property(property).to.equal(value);
  }
  static toHaveOwnProperty(body, value) {
    return expect(body).to.have.own.property(value);
  }

  static toNotHaveOwnProperty(body, value) {
    return expect(body).to.not.have.own.property(value);
  }

  // static toNotEqual(property, value) {
  //   return expect(property).to.not.equal(value);
  // }

  static toBeWithin(property, value) {
    return expect(property).to.be.within(value[0], value[1]);
  }
  static toHave(body, property, value) {
    return expect(body).to.have[property](value);
  }
  static toHaveNestedInclude(body, value) {
    return expect(body).to.have.nested.include(value);
  }
  static toHaveNestedProperty(body, value) {
    return expect(body).to.have.nested.property(value);
  }
  static toNestedInclude(body, value) {
    return expect(body).to.nested.include(value);
  }
  static errToBeNull(err) {
    return expect(err).to.be.null;
  }
  static toEqual = (property, value) => {
    return expect(property).to.be.equal(value);
  };
  static toNotEqual = (property, value) => {
    return expect(property).to.be.not.equal(value);
  };
  static toNotDeepEqual = (property, value) => {
    return expect(property).to.not.deep.equal(value);
  };
  static toDeepEqual = (property, value) => {
    return expect(property).to.deep.equal(value);
  };
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
            // let property = resp.hasChild ? _.get(res, resp.property) : res[resp.property];
            // expect(property)[resp.function](resp.value);
            // this["toEqual"](resp.property, resp.value)
            let property = _.get(res.body, resp.property, undefined)

            // resp.hasChild
            //   ? _.get(res.body, resp.property)
            //   : res.body[resp.property]; 
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
            // this[resp.function](res[resp.property], resp.value);
            let property =
              _.get(res.body, resp.property, undefined)
            // resp.hasChild
            //   ? _.get(res.body, resp.property)
            //   : res.body[resp.property];
            // console.log("ss", property);

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
            // expect(res.body[resp.property])[resp.function](resp.value);
            let property = _.get(res.body, resp.property)
            // resp.hasChild
            //   ? _.get(res.body, resp.property)
            //   : res.body[resp.property];
            // console.log("ss", property);
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
            // expect(res.body[resp.property])[resp.function](resp.value);
            let property = _.get(res.body, resp.property)
            // resp.hasChild
            //   ? _.get(res.body, resp.property)
            //   : res.body[resp.property];
            // console.log("ss", property);
            this[resp.function](property, resp.value);
          });
          params.end();
        });
    });
  }
}

export default Test;
