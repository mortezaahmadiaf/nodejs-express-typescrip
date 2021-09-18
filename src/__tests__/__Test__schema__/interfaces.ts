export interface TestApiI {
    describe: string,
    its: Array<ItsI>
}
export interface ItsI {
    description: string
    url: string
    method: 'post' | 'get' | 'put' | 'delete'
    payload: any
    returnResponseOk: boolean
    expectedResponse?: Array<EcpectResponseI>
    needAuthentication?: boolean
}
export interface EcpectResponseI {
    hasChild?: boolean
    property: string | "errMessage" | "status" | "error" | "payload" | "payload.data" | 'payload.data.length' | "error.errmsg" | "payload.totalRecords" | string
    value: any
    function: "toEqual" | "toNotEqual" | "toNotDeepEqual" | "toDeepEqual" | "toBeWithin" | "toNestedInclude" | "toHaveNestedProperty"
}