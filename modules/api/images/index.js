const express = require('express');

const Router = express.Router();

const imagesController = require('./imagesController')

Router.post('/', (req, res) => {
  //khai bao object
  var imageInfo = {
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  }

  console.log('post data ', req.body);

  //luu lai vao db
  imagesController.addImage(imageInfo, (err, doc) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send("Success");
    }
  });
});

Router.get('/', (req, res) => {
  var id = req.query.id;
  if (id && !isNaN(id)) {
    try {
      imagesController.getImageById(id, (err, doc) => {
        if (err) {
          console.log(err);
          res.send("lỗi cmnr ")
        } else {
          res.send(doc);
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else {

    try {
      imagesController.getAllImage((err, doc) => {
        if (err) {
          console.log(err);
          res.send("lỗi cmnr ")
        } else {
          res.send(doc);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
})

Router.put('/', (req, res) => {
  var newData = {
    id: req.body.id,
    name: req.body.name,
    imageLink: req.body.imageLink,
    description: req.body.description
  };
  imagesController.updateImageById(newData, (err, doc) => {
    if (err) {
      res.send('lỗi cmnr');
    } else {
      res.send('update cmnr');
    }
  });
});

Router.delete('/', (req, res) => {
  var id = req.body.id;

  if(id){
    if(!isNaN(id)){
      imagesController.deleteImageById(id, (err, doc) => {
        if (err) {
          res.send('lỗi cmnr');
        } else {
          res.send('xóa cmnr');
        }
      })
    }else{
      res.send('nhập sai id');
    }
  }else{
    res.send('chưa nhập id ');
  }

})

module.exports = Router;
