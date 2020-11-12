const path = require('path');
const express = require('express');
const Router = express.Router();
const nodemailer = require("nodemailer");
const config = require('config');
const User = require('../../models/User');


// async..await is not allowed in global scope, must use a wrapper
async function main(mailData) {
  const sender = config.get('sender');
  const senderPass = config.get('senderPass');
  const to = mailData.to;
  const from = sender;
  const fromName = mailData.fromName;
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        auth: {
            user: sender,
            pass: senderPass
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Barterly.net" <' + from + '@zoho.com>', // sender address
      to: '"' + to + '"', // list of receivers
      subject: "Barterly.net trade with" + fromName +"!", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>" + fromName +" is interested in trading with you</b>", // html body
    },(err, info) => {
        console.log('CALLBACK on MAIL SEND',err, info);
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  Router.post('/', async (req,res) => {
    const mailData = {
      to: null,
      from: null,
      fromName: null
    }
    const toUser = await User.findById(req.body.to);
    const fromUser = await User.findById(req.body.from);
    mailData.fromName = fromUser.name;
    mailData.to = toUser.email;
    console.log('$$$$$ user', toUser, fromUser, mailData);

    main(mailData).catch(console.error);
  });

  var mailchimpInstance   = 'us2',
    listUniqueId        = '27112749e8',
    mailchimpApiKey     = 'ae3c363dc58f6b354aa0ff88cf857f62-us2';

Router.post('/signup', function (req, res) {
    request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
});
  // main().catch(console.error);

  module.exports = Router;