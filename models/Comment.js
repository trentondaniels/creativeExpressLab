var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  user: String,
  text: String,
  likes: {type: Number, default: 0}
});

mongoose.model('Comment', CommentSchema, 'comments');
