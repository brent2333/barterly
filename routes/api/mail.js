const path = require('path');
const express = require('express');
const Router = express.Router();
const nodemailer = require("nodemailer");
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');


// @route   POST api/mail/
// @desc    Send email
// @access  Private
  Router.post('/', [auth,
    [check('deal', 'Email text is required').not().isEmpty()]
  ], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
      const mailData = {
        to: null,
        from: null,
        fromName: null
      }
      const toUser = await User.findById(req.body.to);
      const fromUser = await User.findById(req.body.from);
      mailData.fromName = fromUser.name;
      mailData.to = toUser.email;  
      const sender = config.get('sender');
      const senderPass = config.get('senderPass');
      const to = mailData.to;
      const from = sender;
      const fromName = mailData.fromName;
      const text = req.body.deal;
      
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
          subject: "Barterly.net trade with " + fromName +"!", // Subject line
          text: "Hello world?", // plain text body
          html: "<b>" + fromName +" is interested in trading with you</b><br/> " + text, // html body
        },(err, info) => {
            console.log('CALLBACK on MAIL SEND',err, info);
            if (err) {
              console.error(err);
            }
            console.log('$$$$$ POST', info);
            res.json(info);
        });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error ON MAIL SEND');
    }
  });

//someday have campaign emails?
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