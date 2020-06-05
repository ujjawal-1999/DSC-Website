const nodemailer = require('nodemailer')
require('dotenv').config();

//for sending to user
const contact = (data) => {
var transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,           //email id
      pass: process.env.NODEMAILER_PASSWORD         //my gmail password
    }
  });
  
  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: `${data.email}`,
    subject:`DSC - ${data.subject}`,
    html:`<p>Hii ${data.name},<br>"Your Issue" - ${data.message} has been recieved and we will solve this issue soon!!</p>`
  };
  console.log("mailOptions : " ,mailOptions);
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//for sending to admin
const contactAdmin = (data) => {
  var transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
    	port:465,
    	secure:true,
      auth: {
        user:  process.env.NODEMAILER_EMAIL,           //email id
        pass:  process.env.NODEMAILER_PASSWORD,            //my gmail password
      }
    });
    
    var mailOptions = {
      from: process.env.NODEMAILER_SECONDARYEMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject:`DSC User Issue Report`,
      html:`A new Report has been issued.<p>Name - ${data.name}</p><p>Email Id - ${data.email}</p><p>Subject - ${data.subject}</p><p>Message - ${data.message}</p><p>Contains Images:${data.img}`};
    console.log("mailOptions : " ,mailOptions);
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

module.exports = {
    contact,
    contactAdmin
}