const express=require('express');
const http=require('http');
const bodyParser = require('body-parser');
const app=express();
const fs=require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/feed',(req,res)=>{


//Writing feedback to a file

var k='';
k+='\n';
k+=req.body.message;
k+='\n';
k.toString();
k+=` by Email id: ${req.body.email}`;
k+='\n';
console.log(k);
fs.appendFile('feed.txt',k,function(err){
console.log(err);
});





//Mailing to User

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bloodorg2019@gmail.com',
      pass: 'blood2019'
    }
  });
  res.send(`<center>Feedback is received ${req.body.email}</center>`);
  var email=`${req.body.email}`;
console.log(`email sent to ${req.body.email}`);
  var mailOptions = {
    from: 'bloodorg2019@gmail.com',
    to: email,
    subject: 'Email Confirmation From BLOOD ORG',
    text: 'Thank You for your Feedback \n We will get back to you soon :)'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


});

app.listen(3002,()=>{
  console.log("Sending your email");
});
