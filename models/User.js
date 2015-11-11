var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String
});

mongoose.model('User', UserSchema, 'users');
