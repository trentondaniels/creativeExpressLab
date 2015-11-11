var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');

/* GET home page. */
router.param('movie', function(req, res, next, id) {
  var query = Movie.findById(id);
  query.exec(function (err, movie){
    if (err) { return next(err); }
    if (!movie) { return next(new Error("can't find movie")); }
    req.movie = movie;
    return next();
  });
});

router.get('/', function(req, res, next) {
  Movie.find(function(err, movies){
    if(err){ return next(err); }
    res.json(movies);
  });
});

/*router.get('/:movie', function(req, res) {
  res.json(req.comment);
});

router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});n

router.put('/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});*/

module.exports = router;
