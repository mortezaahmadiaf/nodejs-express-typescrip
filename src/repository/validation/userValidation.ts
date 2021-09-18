import { UserValidate } from '../metadata/userMetadata'

export const add = [
    UserValidate.countryCode,
    UserValidate.phone,
    UserValidate.password
]
export const update = [
    UserValidate.countryCode,
    UserValidate.phone,
    UserValidate.id
]
export const remove = [
    UserValidate.id,

]