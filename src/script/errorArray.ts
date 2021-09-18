

export const  errorsHandler = (errors):Array<string>=>{
 let error= errors.map((item)=>item.message.split('.').lenght>1?item.message.split('.')[1]:item.message)
    return error

}