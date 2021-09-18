import { ProfileValidate } from '../metadata/profileMetaData'
export const add = [
    ProfileValidate.userId,
    ProfileValidate.firstName,
    ProfileValidate.lastName,

]
export const update = [
    ProfileValidate.id,
    ProfileValidate.lastName,
    ProfileValidate.firstName
]
export const remove = [ProfileValidate.id]