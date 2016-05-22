var express = require('express');
var router = express.Router();

var tech = require('../server/controller/tech.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Frank Wan' });
});

router.get('/tech', tech.getTech);

router.get('/tech/new', tech.getNewTech);
router.post('/tech/new', tech.postNewTech);

router.get('/story', function(req, res, next) {
  res.render('index', { title: 'story' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'about' });
});


module.exports = router;
