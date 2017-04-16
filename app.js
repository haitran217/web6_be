console.log("hello world");

const fs = require('fs');

//dung cac thu vien express

const express = require('express');

var app = express();

//set public file public
// app.use(ur)
app.use(express.static(__dirname + '/public'));

app.get('/',function(reg,res){
  res.send('./public/index.html');
})

app.get('/image/add',(req,res) => {
  //khai bao object
  var imageinfo = {
    name : req.query.name,
    imagelink : req.query.imagelink,
    description : req.query.description
  }
  //luu lai vao file
  fs.writeFileSync('imageData.json',JSON.stringify(imageinfo));
  //baso thanh cong
  res.send('Success');
})
//

app.get('/image/get',(rep,res) =>{
  var img = fs.readFileSync('imageData.json','utf-8');

  var imgJson = JSON.parse(img);
  var listImg = '';
    listImg += '<h1>' + imgJson.name +'</h1>'+
               '<h2>' + imgJson.description +'</h2>'+
               '<img src = "' + imgJson.imagelink + '">';
  res.send(listImg);
})

app.listen(6969,function(reg,res){
  console.log('app listen on 6969');
})
