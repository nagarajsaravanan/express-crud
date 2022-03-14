const nodemailer = require('nodemailer');

// send email
const sendMail = async (data) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: data.to,
        subject: data.subject,
        html: data.template,
    };

    let transport = await connectMail();

    transport.sendMail(mailOptions)
}

const connectMail = async () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
}
const mailService = async (data) => {
    switch (data.type) {
        case 'new-customer':
            sendCustomerWelcomeMail(data)
            break;
        case 'update-customer':
            sendCustomerUpdateMail(data)
            break;
    }
}
const sendCustomerWelcomeMail = async (data) => {
    data.payload.template = `
    <div style="padding: 30px 100px;">
    <div style=" text-align: center; background: yellow; color: green; padding: 70px; font-size: 27px; text-transform: uppercase; font-weight: bold;">Node Training Activities</div>
    <div style="padding: 10px 50px;">
    <h3 style="margin-bottom: 0;">Hi ${data.payload.user_name}</h3>
    <p style="text-indent: 30px;font-size: 14px; margin-top: 0;">You have successfully singup with the Node Training Activities!<p>
    </br>
    </br>
    <p style="font-size: 14px;font-weight: bold; margin-bottom: 0;">Thanks</p>
    <p style="font-size: 14px;margin-top: 0;">Node Training Activities</p>
    </div>
    <div style=" text-align: center; background: #d52c2c; padding: 70px; font-size: 27px; text-transform: uppercase; font-weight: bold;">Footer Content</div>
    </div>`
    data.payload.to = data.payload.email
    data.payload.subject = "Welcome to Node Training Activities"
    sendMail(data.payload)
}
const sendCustomerUpdateMail = async (data) => {

}
module.exports = { mailService }