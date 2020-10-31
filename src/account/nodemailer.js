const nodemailer = require("nodemailer");
require("dotenv").config();
const cryptoRandomString = require("crypto-random-string");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

function sendBody(subject, body, content, link, button) {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <style type="text/css">
          /* CLIENT-SPECIFIC STYLES */
          #outlook a {
            padding: 0;
          } /* Force Outlook to provide a "view in browser" message */
          .ReadMsgBody {
            width: 100%;
          }
          .ExternalClass {
            width: 100%;
          } /* Force Hotmail to display emails at full width */
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%;
          } /* Force Hotmail to display normal line spacing */
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          } /* Prevent WebKit and Windows mobile changing default text sizes */
          table,
          td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          } /* Remove spacing between tables in Outlook 2007 and up */
          img {
            -ms-interpolation-mode: bicubic;
          } /* Allow smoother rendering of resized image in Internet Explorer */
    
          /* RESET STYLES */
          body {
            margin: 0;
            padding: 0;
          }
          img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
          }
          table {
            border-collapse: collapse !important;
          }
          body {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
          }
    
          /* iOS BLUE LINKS */
          .appleBody a {
            color: #68440a;
            text-decoration: none;
          }
          .appleFooter a {
            color: #999999;
            text-decoration: none;
          }
    
          /* MOBILE STYLES */
          @media screen and (max-width: 525px) {
            /* ALLOWS FOR FLUID TABLES */
            table[class="wrapper"] {
              width: 100% !important;
            }
    
            /* ADJUSTS LAYOUT OF LOGO IMAGE */
            td[class="logo"] {
              text-align: left;
              padding: 20px 0 20px 0 !important;
            }
    
            td[class="logo"] img {
              margin: 0 auto !important;
            }
    
            /* USE THESE CLASSES TO HIDE CONTENT ON MOBILE */
            td[class="mobile-hide"] {
              display: none;
            }
    
            img[class="mobile-hide"] {
              display: none !important;
            }
    
            img[class="img-max"] {
              max-width: 100% !important;
              height: auto !important;
            }
    
            /* FULL-WIDTH TABLES */
            table[class="responsive-table"] {
              width: 100% !important;
            }
    
            /* UTILITY CLASSES FOR ADJUSTING PADDING ON MOBILE */
            td[class="padding"] {
              padding: 10px 5% 15px 5% !important;
            }
    
            td[class="padding-copy"] {
              padding: 10px 5% 10px 5% !important;
              text-align: center;
            }
    
            td[class="padding-meta"] {
              padding: 30px 5% 0px 5% !important;
              text-align: center;
            }
    
            td[class="no-pad"] {
              padding: 0 0 20px 0 !important;
            }
    
            td[class="no-padding"] {
              padding: 0 !important;
            }
    
            td[class="section-padding"] {
              padding: 50px 15px 50px 15px !important;
            }
    
            td[class="section-padding-bottom-image"] {
              padding: 50px 15px 0 15px !important;
            }
    
            /* ADJUST BUTTONS ON MOBILE */
            td[class="mobile-wrapper"] {
              padding: 10px 5% 15px 5% !important;
            }
    
            table[class="mobile-button-container"] {
              margin: 0 auto;
              width: 100% !important;
            }
    
            a[class="mobile-button"] {
              width: 80% !important;
              padding: 15px !important;
              border: 0 !important;
              font-size: 16px !important;
            }
          }
        </style>
      </head>
    
      <body style="margin: 0; padding: 0">
        <!-- HEADER -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td bgcolor="#ffffff">
              <div align="center" style="padding: 0px 15px 0px 15px">
                <table
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  width="500"
                  class="wrapper"
                >
                  <!-- LOGO/PREHEADER TEXT -->
                  <tr>
                    <td style="padding: 20px 0px 30px 0px" class="logo">
                      <table
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            bgcolor="#ffffff"
                            width="400"
                            align="right"
                            class="mobile-hide"
                          >
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr></tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
    
        <!-- ONE COLUMN SECTION -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td
              bgcolor="#ffffff"
              align="center"
              style="padding: 70px 15px 70px 15px"
              class="section-padding"
            >
              <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                width="500"
                class="responsive-table"
              >
                <tr>
                  <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <!-- COPY -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #333333;
                                "
                                class="padding-copy"
                              >
                                ${subject}
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  padding: 20px 0 0 0;
                                  font-size: 16px;
                                  line-height: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #666666;
                                "
                                class="padding-copy"
                              >
                                ${body}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- HERO IMAGE -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tbody>
                              <tr>
                                <td class="padding-copy">
                                  <table
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                  >
                                    <tr>
                                      <td>
                                        <a
                                          href="https://dscnits.tech"
                                          ><img
                                            src="cid:unique@kreata.ee"
                                            border="0"
                                            alt="DSC NIT Silchar"
                                            style="
                                            border: 0;
                                            height: auto;
                                            line-height: 100%;
                                            display: flex;
                                            height: 200px;
                                            width: auto;
                                            margin-left: auto;
                                            margin-right: auto;
                                            outline: none;
                                            text-decoration: none;
                                            "
                                            class="img-max"
                                        /></a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- COPY -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  font-size: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #333333;
                                  padding-top: 30px;
                                "
                                class="padding-copy"
                              >
                                ${content}
                              </td>
                            </tr>
                            <!-- <tr>
                              <td
                                align="center"
                                style="
                                  padding: 20px 0 0 0;
                                  font-size: 16px;
                                  line-height: 25px;
                                  font-family: Helvetica, Arial, sans-serif;
                                  color: #666666;
                                "
                                class="padding-copy"
                              >
                                Using fluid structures, fluid images, and media
                                queries, we can make email (nearly) as responsive as
                                modern websites.
                              </td>
                            </tr> -->
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <!-- BULLETPROOF BUTTON -->
                          <table
                            width="100%"
                            border="0"
                            cellspacing="0"
                            cellpadding="0"
                            class="mobile-button-container"
                          >
                            <tr>
                              <td
                                align="center"
                                style="padding: 25px 0 0 0"
                                class="padding-copy"
                              >
                                <table
                                  border="0"
                                  cellspacing="0"
                                  cellpadding="0"
                                  class="responsive-table"
                                >
                                  <tr>
                                    <td align="center">
                                      <a
                                        href="${link}"
                                        target="_blank"
                                        style="
                                          font-size: 16px;
                                          font-family: Helvetica, Arial, sans-serif;
                                          font-weight: normal;
                                          color: #ffffff;
                                          text-decoration: none;
                                          background-color: #5d9cec;
                                          border-top: 15px solid #5d9cec;
                                          border-bottom: 15px solid #5d9cec;
                                          border-left: 25px solid #5d9cec;
                                          border-right: 25px solid #5d9cec;
                                          border-radius: 3px;
                                          -webkit-border-radius: 3px;
                                          -moz-border-radius: 3px;
                                          display: inline-block;
                                        "
                                        class="mobile-button"
                                        >${button} &rarr;</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
}

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
    html: sendBody(
      data.subject,
      `<p>Hello ${data.name},<br>"Your Issue" - ${data.message} <br /> has been recieved and we will solve this issue soon!!</p>`,
      "Meanwhile you can explore our website by clicking on the button below",
      "https://dscnits.tech",
      "Click Here"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log("mailOptions : ", mailOptions);

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

  // filesArray = data.files.split("--");

  let mailContent = `
  A new Report has been issued.<p>Name - ${data.name}</p><p>Email Id - ${data.email}</p><p>Subject - ${data.subject}</p><p>Message - ${data.message}</p><p>Contains Images:${data.img}`;
  var mailOptions = {
    from: process.env.NODEMAILER_SECONDARYEMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `DSC User Issue Report`,
    html: sendBody(
      `DSC User Issue Report`,
      mailContent,
      "Please visit the website to check",
      "https://dscnits.tech",
      "Click Here"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

//for sending to admin
const signUpMail = (data, protocol, host) => {
  const rand = cryptoRandomString({ length: 100, type: "url-safe" });
  // const host = req.get("host");
  // const link = `http://localhost:3000/user/verify/${data._id}?tkn=${rand}`;
  // const link = `https://dscnitsilchar.herokuapp.com/user/verify/${data._id}?tkn=${rand}`;
  const PORT = process.env.PORT || 8080;
  const link = `${protocol}://${host}/user/verify/${data._id}?tkn=${rand}`;
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
    subject: "DSC - Email Verification", 
    html: sendBody(
      "Email Verification",
      ``,
      `Hello ${data.name}, please Click on the button to verify your email`,
      link,
      "Verify Email"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// Email to reset password
const forgotPassword = (data, protocol, host) => {
  const rand = cryptoRandomString({ length: 100, type: "url-safe" });
  // const link = `http://localhost:3000/user/verify/forgotpassword/${data._id}?tkn=${rand}`;
  // const link = `https://dscnitsilchar.herokuapp.com/user/verify/forgotpassword/${data._id}?tkn=${rand}`;
  const PORT = process.env.PORT || 8080;
  const link = `${protocol}://${host}/user/verify/forgotpassword/${data._id}?tkn=${rand}`;

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
    html: sendBody(
      "Reset Password",
      ``,
      "Please Click on the button to reset your password",
      link,
      "Reset Password"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Message sent for forgot Password.");
    }
  });
};

const blogReportWarning = (blog, protocol, host) => {
  const rand = cryptoRandomString({ length: 100, type: "url-safe" });
  // const link = `http://localhost:3000/user/verify/forgotpassword/${data._id}?tkn=${rand}`;
  // const link = `https://dscnitsilchar.herokuapp.com/user/verify/forgotpassword/${data._id}?tkn=${rand}`;
  const PORT = process.env.PORT || 8080;
  const link = `${protocol}://${host}/blog/view/${blog._id}`;

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
    to: blog.author.email,
    subject: "Reported Blog Warning",
    html: sendBody(
      "Reported Blog Warning",
      "",
      `Hello,<br>this is to inform you that one of your blog ${blog.name} has been reported multiple times and maybe deleted if reports continue`,
      link,
      "View Blog"
    ),
    attachments: [
      {
        filename: "logo.png",
        path: __dirname + "/logo.png",
        cid: "unique@kreata.ee", //same cid value as in the html img src
      },
    ],
  };
  // console.log(mailOptions);
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Message sent for Report Warning.");
    }
  });
};

//for sending to admin
const reportBlogToAdmin = (blog, protocol, host) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, //email id
      pass: process.env.NODEMAILER_PASSWORD, //my gmail password
    },
  });

  const link = `${protocol}://${host}/blog/view/${blog._id}`;

  // filesArray = data.files.split("--");

  let mailContent = `
  A new Blog Report has been issued.<p>Name - ${data.name}</p>`;
  var mailOptions = {
    from: process.env.NODEMAILER_SECONDARYEMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `DSC Blog Issue Report`,
    html: sendBody(
      "DSC Blog Issue Report",
      "",
      mailContent,
      link,
      "Visit Blog"
    ),
  };
  // console.log("mailOptions : ", mailOptions);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  contact,
  contactAdmin,
  signUpMail,
  forgotPassword,
  reportBlogToAdmin,
  blogReportWarning,
};
