import { Response, Request, NextFunction } from 'express';
import { UserManager } from '../modules/users/manager';
import {
	sendError,
	sendResult,
	genRandomString
} from '../script';
import { UserI } from '../modules/users/schema';
// @Route('/user')	
export default class User {
	private user: UserManager = new UserManager();


	add(req: Request, response: Response, next: NextFunction) {
		let { phone, countryCode, password } = req.body as UserI
		this.user.createUser({ phone, countryCode, password })
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })

	}
	update(req: Request, response: Response, next: NextFunction) {
		let { countryCode, phone, id }: UserI = req.body
		this.user.update({ id, phone, countryCode })
			.then((res) => { sendResult({ response, message: 'user update' }) })
			.catch((error) => { sendError({ response, message: error }) })
	}
	delete(req: Request, response: Response, next: NextFunction) {
		let { id } = req.body
		this.user.deleteUser(id)
			.then((res) => { sendResult({ response, message: 'user Deleted' }) })
			.catch((error) => { sendError({ response, message: error }) })
	}
	findOne(req: Request, response: Response, next: NextFunction) {
		let { id } = req.params
		this.user.findUserById(id)
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	findAll(req: Request, response: Response, next: NextFunction) {
		this.user.getAll()
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	changePass(req: Request, response: Response, next: NextFunction) {
		let { id, password, oldPassword } = req.body
		this.user.changePassword({ password, id }, oldPassword)
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
}
