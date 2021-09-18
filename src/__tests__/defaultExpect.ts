import { EcpectResponseI } from './__Test__schema__/interfaces'
export const expectedOk: Array<EcpectResponseI> = [{
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
},]

export const expectedError: Array<EcpectResponseI> = [{
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
},]