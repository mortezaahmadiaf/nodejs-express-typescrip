// import { Get, Post, Route, Delete, Put } from 'tsoa';
import { Response, Request, NextFunction } from 'express'
import { ToDoManager } from '../modules/todo/manager'
import { ToDoI, ToDoUpdateI } from '../modules/todo/schema';
import { sendError, sendResult } from '../script';


import * as _ from 'lodash'
import { ObjectId } from 'bson';
// @Route('/job')
export default class ToDo {
	private todo: ToDoManager = new ToDoManager()

	add(req: Request, response: Response, next: NextFunction) {
		let { userId, toDo, done }: ToDoI = req.body
		this.todo.insert({ done, toDo, userId })
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	update(req: Request, response: Response, next: NextFunction) {
		let { done, _id, toDo } = req.body
		this.todo.update({ _id, done, toDo })
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	delete(req: Request, response: Response, next: NextFunction) {
		let { _id } = req.body
		this.todo.delete(_id)
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	findOne(req: Request, response: Response, next: NextFunction) {
		let { id } = req.params
		this.todo.getById(new ObjectId(id))
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	findAll(req: Request, response: Response, next: NextFunction) {
		this.todo.getAll()
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
}
