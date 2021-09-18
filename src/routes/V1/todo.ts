import { Request, Response, NextFunction, Router } from 'express';
import todoController from '../../controllers/todoController'
import { BaseRouter } from '../../repository/BaseRouter'
import { add } from '../../repository/validation/todoValidation'
import { AccessPolicy } from '../../repository/policy/accessPolicy'
import { ValidationPolicy } from '../../repository/policy/validationPolicy'

class ToDo extends BaseRouter {

	constructor() {
		super(todoController)
		this.init()
	}
	init() {
		let validationPolicy = new ValidationPolicy()
		validationPolicy.insert = add
		super.init(validationPolicy)
	}




}
const todo = new ToDo().router

export { todo }
