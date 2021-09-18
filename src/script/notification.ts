import * as admin from 'firebase-admin'

const serviceAccount = require("../config/config.json");

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount.firebase),
// });


export const oneToOneNotification = ({ deviceToken, text, title }) => {
	// receiver user token

	// const message = {
	// 	notification: {
	// 		title: title,
	// 		body: text
	// 	},
	// 	data: {
	// 		score: '850',
	// 		time: '2:45'
	// 	},
	// 	token: deviceToken
	// };

	// admin
	// 	.messaging()
	// 	.send(message)
	// 	.then((response) => {
	// 		// Response is a message ID string.
	// 		console.log('Successfully sent message:', response);
	// 	})
	// 	.catch((error) => {
	// 		console.log('Error sending message:', error);
	// 	});
};

export const multicastNotification = ({ deviceToken }) => {

	// const registrationTokens = getTokens('token');
	// const message = {
	// 	notification: {
	// 		title: 'test',
	// 		body: 'test'
	// 	},
	// 	data: { score: '850', time: '2:45' },
	// 	tokens: registrationTokens
	// };

	// admin
	// 	.messaging()
	// 	.sendMulticast(message)
	// 	.then((response) => {
	// 		console.log(response.successCount + ' messages were sent successfully');
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});

};

export const broadcastNotification = () => {
	// The topic name can be optionally prefixed with "/topics/".
	const topic = 'highScores';

	const message = {
		notification: {
			title: 'test',
			body: 'test'
		},
		data: {
			score: '850',
			time: '2:45'
		},
		topic: topic
	};

	// Send a message to devices subscribed to the provided topic.
	admin
		.messaging()
		.send(message)
		.then((response) => {
			// Response is a message ID string.
			console.log('Successfully sent message:', response);
		})
		.catch((error) => {
			console.log('Error sending message:', error);
		});
	//   // Define a condition which will send to devices which are subscribed
	// // to either the Google stock or the tech industry topics.
	// const condition = "'stock-GOOG' in topics || 'industry-tech' in topics";

	// // See documentation on defining a message payload.
	// const message = {
	//   notification: {
	//     title: '$FooCorp up 1.43% on the day',
	//     body: '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.'
	//   },
	//   condition: condition
	// };

	// // Send a message to devices subscribed to the combination of topics
	// // specified by the provided condition.
	// admin.messaging().send(message)
	//   .then((response) => {
	//     // Response is a message ID string.
	//     console.log('Successfully sent message:', response);
	//   })
	//   .catch((error) => {
	//     console.log('Error sending message:', error);
	//   });
};

const getTokens = (records) => {
	let p = records.map((item) => item.deviceToken);
	return p;
};
