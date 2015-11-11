var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.sendfile('./public/auth.html', { title: 'Express' });
});

router.get('/home', ensureAuthenticated, function(req, res) {
  console.log(req.user.username);
  res.sendfile('./public/home.html');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
res.redirect('/')
}

module.exports = router;
