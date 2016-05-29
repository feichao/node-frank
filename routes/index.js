var express = require('express');
var router = express.Router();

var IndexCtrl = require('../server/controller/index.js');
var ArticleCtrl = require('../server/controller/article.js');

/* GET home page. */
router.get('/', IndexCtrl.getIndex);

router.get('/article(/0/:id)?', ArticleCtrl.getArticle);
router.get('/article/new', ArticleCtrl.createArticlePage);
router.post('/article/new', ArticleCtrl.createArticle);

router.get('/story', IndexCtrl.getIndex);

router.get('/about', IndexCtrl.getIndex);


module.exports = router;
