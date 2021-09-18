import { validationResult } from 'express-validator';
import { sendError } from '../script/sendMessages';
const validator = (request, response, Next) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		Next();
	} else {
		// const extractedErrors = [];
		// errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
		// console.error({ extractedErrors });
		let extractedErrors = '';
		errors.array().map((err) => { extractedErrors = extractedErrors + ` ${err.msg} ,` });
		console.error({ extractedErrors });
		sendError({ response, message: extractedErrors });
	}
};

export default validator;
