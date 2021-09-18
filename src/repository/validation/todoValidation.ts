import { ToDOValidate } from '../metadata/todoMetadata'

export const add = [
    ToDOValidate.userId,
    ToDOValidate.toDo
]
export const update = [
    ToDOValidate.toDo,
    ToDOValidate.done,
    ToDOValidate._id
]
export const remove = [ToDOValidate._id]