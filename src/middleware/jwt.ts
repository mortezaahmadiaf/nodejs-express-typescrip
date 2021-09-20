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
		return sendError({ response, status: 401, message: { error: 'access denied', errorMsg: 'first send get request to /test/jwt when recive token put it in header with keyname jwt and send request' } });
	else
		// if token exist
		try {
			// check decript jwt by JWT_TOKEN_SECURE_STRING
			const verified = jwt.verify(jwtToken, process.env.JWT_TOKEN_SECURE_STRING);
			//if   decript jwt by JWT_TOKEN_SECURE_STRING dont have problem add userId to request header
			request['validJWT'] = verified;
			// call next
			Next();
		} catch (error) {
			//if   decript jwt by JWT_TOKEN_SECURE_STRING have problem send invalid user to client
			sendError({ response, message: { error: 'invalid user', errorMsg: '' }, status: 401 });
		}
};
