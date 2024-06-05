const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async options => {
    //1) create a transporter
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

        // Activate in gmail "less secure app" option
    });

    //2) define the email options
    const mailOptions = {
        from: 'Rushikesh Jere <jrushi2010@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
        //html:
    }

    //3) actually send the email 
    await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;