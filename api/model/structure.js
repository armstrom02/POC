'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userprofile = new Schema({
name: {type: String},
email: {type: String},
password: {type: String,}
});




module.exports = mongoose.model('userp', userprofile);

