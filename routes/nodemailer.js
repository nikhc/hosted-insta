
const nodemailer = require("nodemailer");

module.exports.sendMail=async function sendMail(str,data) {

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'nikhil23fbd@gmail.com',
    pass: "rbjmvcyelvadmdav"
  }
  
});
console.log("dhjsbjhbdsjhbc")

// async..await is not allowed in global scope, must use a wrapper

    var Osubject,Otext,Ohtml;
    if(str=="signup"){
        Osubject=`thankyou for signning ${data.name}`
        Ohtml=`<h1>welcome bro welcome</h1>
        name-${data.name}`
        console.log("mnds jh jhsds jbjdsbcjbds")
    }
    else if(str=='resetPassword'){
        Osubject=`resetpassword`
        console.log("else")

        Ohtml=`<h1>food app</h1> ${data.resetPasswordLink}`

    }
  // send mil with defined transport object
  const info = await transporter.sendMail({
    from: '"nikhil" <nikhil23fbd@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml // html body
  });

  
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

