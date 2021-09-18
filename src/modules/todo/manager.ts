import { ObjectId } from 'bson'

import { ToDoModel } from './model'
import { ToDo, ToDoI, ToDoUpdate, ToDoUpdateI } from './schema'

export class ToDoManager {
    private todo: ToDoModel = new ToDoModel()
    //  ___________________________________________________________________________________________________________________________________
    public insert(params: ToDoI) {
        return new Promise((resolve, reject) => {
            let job = new ToDo(params).getJson()
            this.todo.save(job, (er, res) => {
                er ?
                    reject({ error: er, errorMsg: 'Database Error' }) :
                    res.insertedCount === 1 ?
                        resolve(res) :
                        reject({ error: "", errorMsg: 'SomeThing went wrong !' })
            })
        })

    }
    public update(params: ToDoUpdateI) {
        return new Promise((resolve, reject) => {
            let job = new ToDoUpdate(params)
            let updateJob = job.getJson()
            this.todo.update(updateJob, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' })
                    : res.value
                        ? resolve(' updated !')
                        : reject({ error: "", errorMsg: ' not updated' })
            })
        })

    }
    public delete(_id: ObjectId) {
        return new Promise((resolve, reject) => {
            this.todo.deleteById(new ObjectId(_id), (er, res) => {
                console.log(er, res)
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })
    }

    public getById(_id: ObjectId) {
        return new Promise((resolve, reject) => {
            this.todo.getById(_id, (er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })

    }
    public getAll() {
        return new Promise((resolve, reject) => {
            this.todo.getAll((er, res) => {
                er ? reject({ error: er, errorMsg: 'Database Error' }) :
                    resolve(res)
            })
        })

    }

}