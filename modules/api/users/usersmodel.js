const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var usersModel  = new Schema({
  id : {type : Number,required: true},
  username : {type : String,required: true},
  pass : {type : String,required: true},
  email : {type : String,required: true},
  address : {type : String,default : ''},
  phone : {type : String,default : ''}
});

module.exports = mongoose.model('users',usersModel);
