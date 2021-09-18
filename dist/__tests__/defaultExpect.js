"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedError = exports.expectedOk = void 0;
exports.expectedOk = [{
        property: "status",
        value: [200, 299],
        function: "toBeWithin",
    }, {
        property: "error",
        value: null,
        function: "toEqual",
    }, {
        property: "errMessage",
        value: null,
        function: "toEqual",
    },];
exports.expectedError = [{
        property: "status",
        value: [400, 499],
        function: "toBeWithin",
    }, {
        property: "error",
        hasChild: false,
        value: null,
        function: "toNotEqual",
    }, {
        property: "errMessage",
        value: null,
        function: "toNotEqual",
    },];
