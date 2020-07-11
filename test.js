var fs=require('fs');
fs.readFile('feed.txt','utf8',(err,data)=>{
if(err)
	console.log(err);
else
	console.log(data);
});