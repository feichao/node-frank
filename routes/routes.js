var express = require('express');
var router = express.Router();

var IndexCtrl = require('../server/controller/index.js');
var ArticleCtrl = require('../server/controller/article.js');
var SmsCtrl = require('../server/controller/sms.js');
var TagCtrl = require('../server/controller/tag.js');
var AboutCtrl = require('../server/controller/about.js');

router.all('*', function(req, res, next) {
	var sess = req.session;

	if(!sess._sessionId) {
		sess._sessionId = new Date().valueOf();
	}

	next();

});

router.get('/', IndexCtrl.getIndex);

router.get('/article(/0/:id)?', ArticleCtrl.getArticle);
router.get('/story(/0/:id)?', ArticleCtrl.getArticleStory);

router.get('/article/new', ArticleCtrl.updateArticlePage);
router.get('/story/new', ArticleCtrl.updateArticlePage);
router.post('/article/new', ArticleCtrl.updateArticle);

router.get('/article/edit/:id', ArticleCtrl.updateArticlePage);
router.post('/article/edit', ArticleCtrl.updateArticle);

router.post('/article/authcode', SmsCtrl.sendAuthCode);

router.get('/tag/:tag', TagCtrl.getTag);
router.get('/about', AboutCtrl.getAbout);


module.exports = router;
