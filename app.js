console.log('Hello nodemon');

const fs = require('fs');
//dung cai thu vien express
const express = require('express');
const bodyParser = require('body-parser');

const imageController = require(__dirname + '/modules/images/imageController');
var app = express();

//set public folder public
//app.use(urlencoded)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
  res.send('./public/index.html');
})


app.post('/image', (req, res) => {
  //doc du lieu
  var imageInfoCollection = imageController.fetchImageCollection();


  //khai bao object
  var imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }
  //push date vafo collection
  imageInfoCollection.push(imageInfo);
  //luu lai vao file
  imageController.saveImageCollection(imageInfoCollection);
  //bao thanh cong
  res.send('Success');
})

app.get('/image', (req, res) => {
  var imageInfoCollection = imageController.fetchImageCollection();


  var htmlstring = '';

  imageInfoCollection.forEach((data) => {
    htmlstring += `<div>${data.name}</div><img
    src="${data.imageLink}"><div>${data.description}</div>`;
  })
  res.send(htmlstring);
})

app.post('/image/update', (req, res) => {
  var imageInfoCollection = imageController.fetchImageCollection();
  var nameOld = req.body.nameOld;
  var nameNew = req.body.nameNew;
  imageInfoCollection.forEach((data) => {
    if (data.name == nameOld) {
      data.name = nameNew;
    }
  })
  imageController.saveImageCollection(imageInfoCollection);
  res.redirect('/image');
})

app.post('/image/delete', (req, res) => {
  var imageInfoCollection = imageController.fetchImageCollection();
  var nameDelete = req.body.nameDelete;
  console.log(nameDelete);
  imageInfoCollection.forEach((data) => {
    if (data.name == nameDelete) {
      delete data.name;
      delete data.imageLink;
      delete data.description;
    }
  })
  imageController.saveImageCollection(imageInfoCollection);
  res.redirect('/image');
})

//mo 1 cai port de chay local
app.listen(6969, (req, res) => {
  console.log('app listen on 6969');
})
