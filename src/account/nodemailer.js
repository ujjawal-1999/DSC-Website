const nodemailer = require("nodemailer");
require("dotenv").config();
const cryptoRandomString = require("crypto-random-string");

//for sending to user
const contact = (data) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: `${data.email}`,
    subject: `DSC - ${data.subject}`,
    html: `<p>Hii ${data.name},<br>"Your Issue" - ${data.message} has been recieved and we will solve this issue soon!!</p>`,
  };
  console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//for sending to admin
const contactAdmin = (data) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_SECONDARYEMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `DSC User Issue Report`,
    html: `A new Report has been issued.<p>Name - ${data.name}</p><p>Email Id - ${data.email}</p><p>Subject - ${data.subject}</p><p>Message - ${data.message}</p><p>Contains Images:${data.img}`,
  };
  console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//for sending to admin
const signUpMail = (data) => {
  const rand = cryptoRandomString({ length: 100, type: "url-safe" });
  // const host = req.get("host");
  const link = `http://localhost:3000/dsc/user/verify/${data._id}?tkn=${rand}`;

  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: `${data.email}`,
    subject: "Please confirm your Email account",
    html:
      "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>",
  };
  console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error', error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Email to reset password
const forgotPassword = (data)=>{
    const rand = cryptoRandomString({ length: 100, type: "url-safe" });
    const link = `http://localhost:3000/dsc/user/verify/forgotpassword/${data._id}?tkn=${rand}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL, //email id
        pass: process.env.NODEMAILER_PASSWORD, //my gmail password
      },
    });
  
    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: data.email,
      subject: "Reset Password",
      html:
        "Hello,<br> Click on the link to your password.<br><a href=" +
        link +
        ">Click here to reset</a>",
    };
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        return;
      } else {
        console.log("Message sent: " + response.message);
      }
    });
}

module.exports = {
  contact,
  contactAdmin,
  signUpMail,
  forgotPassword
};
