var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
  name: String,
  money: String,
  trailerUrl: String,
  description: String,
  comments: [{user: String, comment: String, upvotes: {type: Number, default: 0}}],
  votes: {type: Number, default: 0}
});

MovieSchema.methods.addComment = function(comment, cb) {
  console.log("in schema method: " + comment)
  this.comments.push(comment);
  this.save(cb);
};

MovieSchema.methods.vote = function(cb) {
	this.votes += 1;
	this.save(cb);
}

MovieSchema.methods.downVote = function(cb) {
	if (this.votes > 0) {
		this.votes -= 1;
	}
	else {
		this.votes = 0;
	}
	this.save(cb);
}

mongoose.model('Movie', MovieSchema, 'movies');
