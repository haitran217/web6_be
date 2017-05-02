const fs = require('fs');
const imagesModel = require('./imagesmodel');

var addImage = (data, callback) => {
  imagesModel.findOne({}).select('id').sort({
    id: -1
  }).exec((err, doc) => {
    if (err) {
      console.log(err);
      callback(err);

    } else {
      var id = doc && doc.id ? doc.id += 1 : 1;
      data.id = id;
      imagesModel.create(data, (err, doc) => {
        if (err) {
          console.log(err);
          callback(err);
        } else {
          console.log(doc);
          callback(null, doc);
        }
      })
    }
  })
}

var getAllImage = (callback) => {
  imagesModel.find({}, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

var getImageById = (id, callback) => {
  imagesModel.find({
    id: id
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

var deleteImageById = (id,callback) => {
  imagesModel.deleteOne({id:id},(err,doc)=>{
    if(err){
      callback(err);
    }else {
      callback(null,doc);
    }
  })
}

var updateImageById = (newData, callback) => {
  imagesModel.updateOne({
    id: newData.id
  }, {
    $set: {
      name: newData.name,
      imageLink: newData.imageLink,
      description: newData.description
    }
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}


module.exports = {
  deleteImageById,
  updateImageById,
  addImage,
  getAllImage,
  getImageById
}
