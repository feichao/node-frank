var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Frank Wan' });
});

router.get('/tech', function(req, res, next) {
  res.render('tech', { title: 'Tech' });
});

router.get('/story', function(req, res, next) {
  res.render('index', { title: 'story' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'about' });
});


module.exports = router;
