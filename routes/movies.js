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

router.put('/:movie/comment', function (req, res, next) {
console.log("In put: " + req.body);
  var comment = req.body;
  req.movie.addComment(comment, function(err, movie){
    if (err) {return next (err)}
    res.json(req.body);
  });
});

router.put('/:movie/vote', function (req, res, next) {
  req.movie.vote(function(err, movie) {
    if (err) {return next (err)}
    res.json(movie);
  });
});

router.put('/:movie/downVote', function (req, res, next) {
  req.movie.downVote(function (err, movie) {
    if (err) {return next (err)}
    res.json(movie);
  });
});

module.exports = router;
