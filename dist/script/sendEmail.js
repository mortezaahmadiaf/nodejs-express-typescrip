'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailDelivery = void 0;
const nodemailer = require("nodemailer");
const senderEmail = 'youremain';
const senderPassword = 'your password';
const emailDelivery = async ({ subject = '', to, message = '' }, callback) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        auth: {
            user: senderEmail,
            pass: senderPassword
        }
    });
    try {
        await transporter.sendMail({
            from: `<${senderEmail}>`,
            to: to,
            subject,
            text: '',
        });
        callback(null, `email send to ${to}`);
    }
    catch (error) {
        callback(error, null);
    }
};
exports.emailDelivery = emailDelivery;
