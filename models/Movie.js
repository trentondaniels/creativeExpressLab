var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  name: String,
  money: String,
  trailerUrl: String,
  description: String,
  comments: [{comment: String, upvotes: {type: Number, default: 0}}],
  votes: {type: Number, default: 0}
});

mongoose.model('Movie', MovieSchema, 'movies');
