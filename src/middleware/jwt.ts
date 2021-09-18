import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { sendError } from '../script/sendMessages';
// a middleware to check jsonwebtoken
export default (request: Request, response: Response, Next: NextFunction) => {
	// take jwt from request hesder
	const jwtToken = request.header('jwt');
	// if token not exist
	if (!jwtToken)
		// send access denied
		return sendError({ response, status: 401, message: 'access denied' });
	else
		// if token exist
		try {
			// check decript jwt by JWT_TOKEN_SECURE_STRING
			const verified = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECURE_STRING);
			//if   decript jwt by JWT_TOKEN_SECURE_STRING dont have problem add userId to request header
			request['STUser'] = verified;
			// call next
			Next();
		} catch (error) {
			//if   decript jwt by JWT_TOKEN_SECURE_STRING have problem send invalid user to client
			sendError({ response, message: 'invalid user', status: 401 });
		}
};
