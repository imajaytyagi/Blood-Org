const express=require('express');
const http=require('http');
const bodyParser = require('body-parser');
const app=express();
var mysql=require('mysql');
var con=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "blood"
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/donor',(req,res)=>{
res.send(`<h1>Thank You for registering</h1>`);
con.connect(function (err){
    if(err){res.send(err);}
    var sql = `INSERT INTO donor VALUES ('${req.body.fname}','${req.body.email}',${req.body.phone},'${req.body.state}','${req.body.blood}',${req.body.days})`;
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log("1 record inserted");

 //var x=JSON.stringyfy(req.body.email);      
     });

//<form class="quote" action="http://localhost:8081/resp" method="POST"> !!!!! carefully add the port
});
//SENDING MAIL TO THE REQUESTED PERSON
  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bloodorg2019@gmail.com',
      pass: 'blood2019'
    }
  });
  // res.send(`<center>Feedback is received ${req.body.email}</center>`);
  var email=`${req.body.email}`;
console.log(`email sent to ${req.body.email}`);
  var mailOptions = {
    from: 'bloodorg2019@gmail.com',
    to: email,
    subject: 'Email Confirmation From BLOOD ORG',
    text: 'Thank you for registering to our website !!!!'
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

});

//console.log(x);
const port=3000;
// const port = process.env.PORT||8081;
app.listen(port, () => {
  console.log(`Server running on port${port}`);
});







