"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastNotification = exports.multicastNotification = exports.oneToOneNotification = void 0;
const admin = require("firebase-admin");
const serviceAccount = require("../config/config.json");
const oneToOneNotification = ({ deviceToken, text, title }) => {
};
exports.oneToOneNotification = oneToOneNotification;
const multicastNotification = ({ deviceToken }) => {
};
exports.multicastNotification = multicastNotification;
const broadcastNotification = () => {
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
    admin
        .messaging()
        .send(message)
        .then((response) => {
        console.log('Successfully sent message:', response);
    })
        .catch((error) => {
        console.log('Error sending message:', error);
    });
};
exports.broadcastNotification = broadcastNotification;
const getTokens = (records) => {
    let p = records.map((item) => item.deviceToken);
    return p;
};
