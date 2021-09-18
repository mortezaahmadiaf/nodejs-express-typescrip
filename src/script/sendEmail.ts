'use strict';
import * as nodemailer from 'nodemailer';

const senderEmail = 'youremain';
const senderPassword = 'your password';
// async..await is not allowed in global scope, must use a wrapper
const emailDelivery = async ({
    subject = '',
    to,
    message = ''
}, callback) => { // create reusable transporter object
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.ethereal.email",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
            user: senderEmail, // generated ethereal user
            pass: senderPassword // generated ethereal password
        }
    });


    // send mail with defined transport object
    try {
        await transporter.sendMail({
            from: `<${senderEmail}>`, // sender address
            to: to, // list of receivers
            subject, // Subject line
            text: '', // plain text body
            // html: Body// html body
        });
        callback(null, `email send to ${to}`)
    } catch (error) {
        callback(error, null)
    }
};

export {
    emailDelivery
};
