import * as dotenv from 'dotenv'
dotenv.config()
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

export const sendMessages = ({ phoneNumber, verifyCode }) => {
	// console.info({ phoneNumber, verifyCode })
	// client.messages
	// 	.create({
	// 		body: `Your Verification Code is ${verifyCode}`,
	// 		from: 'chooseName',
	// 		to: `+${phoneNumber}`
	// 	})
	// 	.then((res) => {
	// 		// console.log(res);
	// 	})
	// 	.catch((er) => {
	// 		console.log(er);
	// 	});
};
