var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
mongoose.connect('mongodb://localhost/creativeExpress');
require('./models/Movie');
require('./models/User');
require('./models/Comment');
var User = mongoose.model('User');

var GITHUB_CLIENT_ID = '57d8d94a06b50aafc1c8'
var GITHUB_CLIENT_SECRET = '76f198ac6a7e8a2c6544dd8724ac0844ecc36b01'

var routes = require('./routes/index');
var users = require('./routes/users');
var movies = require('./routes/movies');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'jklasdfjfdsij2344k'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://ec2-54-148-77-110.us-west-2.compute.amazonaws.com:4015/auth/github/callback'
}, function(accessToken, refreshToken, profile, done) {
    User.findOne({
      username: profile.username
    }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          user = new User({
            username: profile.username
          });
          user.save(function(err) {
            if (err) console.log(err);
            return done(err, user);
          });
        }
        else {
          return done(err, user);
        }
    }); 
  }))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/', routes);
app.use('/user', users);
app.use('/movies', movies);
app.get('/auth/github', passport.authenticate('github'));


app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/home',
  failureRedirect:'/auth'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
