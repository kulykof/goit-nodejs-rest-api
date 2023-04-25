require('dotenv').config();

const {SEND_MAIL_USER, SEND_MAIL_PASSWORD} = process.env

const nodemailer = require('nodemailer');

const sendEmail = async data => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.meta.ua',
        port: 465,
        secure: true,
        auth: {
            user: SEND_MAIL_USER,
            pass: SEND_MAIL_PASSWORD,
        },
    });

    await transporter.sendMail({ ...data, from: SEND_MAIL_USER });

    return true;
};

module.exports = sendEmail;