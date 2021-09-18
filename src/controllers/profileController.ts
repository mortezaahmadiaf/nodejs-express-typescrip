// import { Post, Get, Route, Body, Put } from 'tsoa';
import { Request, Response, NextFunction } from 'express'
import { ProfileManager } from '../modules/profile/manager'
import { ProfileI } from '../modules/profile/schema';
import { sendError, sendResult } from '../script';
import { UserManager } from '../modules/users/manager'
// @Route('/profile')
export default class Profile {
	private profile: ProfileManager = new ProfileManager()
	private user: UserManager = new UserManager()

	add(req: Request, response: Response, next: NextFunction) {
		let { userId, lastName, firstName }: ProfileI = req.body
		this.profile.createProfile({ firstName, lastName, userId })
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	update(req: Request, response: Response, next: NextFunction) {
		let { id, lastName, firstName }: ProfileI = req.body
		this.profile.updateProfile({ firstName, lastName, id })
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	delete(req: Request, response: Response, next: NextFunction) {
		let { id } = req.body
		this.profile.delete(id)
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	findOne(req: Request, response: Response, next: NextFunction) {
		let { id } = req.params
		this.profile.getProfileById(id)
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}
	findAll(req: Request, response: Response, next: NextFunction) {
		this.profile.findAll()
			.then((res) => { sendResult({ response, message: res }) })
			.catch((er) => { sendError({ response, message: er }) })
	}

}
