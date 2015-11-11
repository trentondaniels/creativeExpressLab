var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  name: String,
  money: String,
  trailerUrl: String,
  description: String,
  comments: Object,
  votes: {type: Number, default: 0}
});

mongoose.model('Movie', MovieSchema, 'movies');
