const nodemailer = require("nodemailer")
require("dotenv").config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

const mailOptions = {
    from: {
        name: 'Prateek Takthar',
        address: process.env.USER
    }, // sender address
    to: ["prateektakthar184b@gmail.com"], // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
};

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        console.log("Mail Sent succesfully")
    } catch (error) {
        console.log(error);
    }
}

sendMail(transporter, mailOptions)