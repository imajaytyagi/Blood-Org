const express=require('express');
const bodyParser = require('body-parser');
const app=express();
var fs=require('fs');

var mysql      = require('mysql');
 var con = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'password',
   database : 'blood'
 });

var sp='';
var rp='';
fs.readFile('feed.txt','utf8',(err,data)=>{
if(err)
	console.log(err);
else
	sp=data.toString();

	// console.log(data);
});
 
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/feeder', (req, res) => {

var html=`<html>`;
html+=`<head>`;
html+=`<style>`;
html+=`div {
  width: 720px;
  height:600;
  padding: 10px;
  border: 5px groove red;
  margin: 0;
}
`;
html+=`</style>`;
html+=`</head>`;
html+=`<body>`;
html+=`<center>`;
html+=`<div>`;
html+=`${sp}`;

html+=`</div>`;
html+=`</center>`;
html+=`</body>`;
html+=`</html>`;

 res.send(html);
});

//getting complete records
var row='';
var kp='';
var ab='';
app.all('/complete',(req,res)=>{
    con.connect(function (err){
    if(err){res.send(err);}
    var sql=`Select * from request`;
     con.query(sql, function (err, result,fields) {
       // if (err) throw err;
       // console.log(result.length);
       for (var i = 0; i < result.length; i++) {
         row = result[i];
          kp=row.Name+" "+row.Phone+" "+row.Email+" "+row.State+" "+row.Blood_Type+" "+row.Quantity+"\n";
        // console.log(row.Name+" "+row.Phone);
        kp+=`<br>`;
         console.log(kp);
          
       /*  fs.appendFile('read_search.txt',kp+"\n",(err)=>{
         	if(err) console.log(err);
         });*/
      }

});
});
fs.readFile('read_search.txt','utf-8',(err,data)=>{
rp=data.toString();

var kml=`<html>`;
kml+=`<head>`;
kml+=`<style>`;
kml+=`div {
  width: 600px;
  height:500;
  padding: 10px;
  border: 5px groove green;
  margin: 0;
}
`;
kml+=`</style>`;
kml+=`</head>`;
kml+=`<body>`;
kml+=`<center>`;
kml+=`<div>`;
kml+=`${rp}`;

kml+=`</div>`;
kml+=`</center>`;
kml+=`</body>`;
kml+=`</html>`;

res.send(kml);
});
});

var spc='';
app.all('/spec_search',(req,res)=>{

con.connect(function (err){
    if(err){res.send(err);}
    var sql=`Select * from request where Name='${req.body.fname}'`;
     con.query(sql, function (err, result,fields) {
     	console.log(result);




});
});
});


app.listen(800,()=>{
console.log("Started your server")
});
