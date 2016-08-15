'use strict';

var Marked = require('../service/marked.js').Marked;
var DateTime = require('../util/datetime.js');

var Config = require('../../config.js');
var ArticleProxy = require('../proxy/article.js');
var Request = require('../constant/request.js');

/**
 * 获取文章内容
 */
function getArticle(req, res, next) {
	req.session.category = 0;
	getArticleDetail(req, res, next);
}

function getArticleStory(req, res, next) {
	req.session.category = 1;
	getArticleDetail(req, res, next);
}

function getArticleDetail(req, res, next) {
	var id = req.params[0];
	var directories = ArticleProxy.getDirectories(req.session.category);

	var pages = Config.pages.filter(function(p, i) { return i === 0 || i === 4; });
	var connects = Config.connects;

	if(id) {
		ArticleProxy.findById(id, function(err, doc) {
			if(err || !doc) {
				return next(err);
			}

			res.render('article', {
				title: doc.title,
				directory: directories,
				blog: {
					id: id,
					title: doc.title,
					author: doc.author,
					category: doc.category === 0 ? '猿文色' : '故事旮',
					href: 'http://www.0xfc.cn' + (doc.category === 0 ? '/article/0/' : '/story/0/') + id,
					tags: doc.tags,
					date: DateTime.datetime(doc.date),
					update: DateTime.datetime(doc.update),
					summary: doc.summary,
					css: doc.css,
					js: doc.js,
					body: Marked(doc.body)
				},
				pages: pages,
				connects: connects
			});

		});
	} else {
		var lastestHref = directories && directories[0] && directories[0][0] && directories[0][0].href || '/';
		res.redirect(lastestHref);
	}
}

function updateArticlePage(req, res, next) {
	var id = req.params.id;
	var categories = Config.categories;

	if(typeof id !== 'undefined') {
		ArticleProxy.findById(id, function(err, doc) {
			if(err || !doc) {
				return next(err);
			}

			res.render('newarticle', {
				title: '编辑文章',
				categories: categories,
				blog: {
					id: id,
					title: doc.title,
					author: doc.author,
					category: doc.category,
					tags: doc.tags.join('+'),
					summary: doc.summary,
					css: doc.css,
					js: doc.js,
					body: doc.body
				}
			});

		});
	} else {
		res.render('newarticle', {
			title: '新建文章',
			categories: categories,
			blog: {}
		});
	}
}

function updateArticle(req, res, next) {
	var sess = req.session;

	if(!sess.authcode || req.body.authcode !== sess.authcode) {
		return res.json(Request.Error.ARTICLE.ILLEGAL_USER);
	}

	if(req.cookies.authcode !== '1') {
		return res.json(Request.Error.ARTICLE.ILLEGAL_AUTHCODE);
	}

	req.body.tags = (req.body.tags || '').split('+').filter(function(t) { return t; }).map(function(t) {
		return t.trim();
	});

	req.body.css = (req.body.css || '').split('\n').filter(function(t) { return t; }).map(function(t) {
		return t.trim();
	});

	req.body.js = (req.body.js || '').split('\n').filter(function(t) { return t; }).map(function(t) {
		return t.trim();
	});

	ArticleProxy.save(req.body, function(err) {
		if(err) {
			return next(err);
		}

		sess.authcode = undefined;
		res.cookie('authcode', 1, {
      expires: new Date(Date.now() - 1), 
      httpOnly: true
    });

		res.json(Request.Ok);
	});
}

module.exports = {
	getArticle: getArticle,
	getArticleStory: getArticleStory,
	updateArticlePage: updateArticlePage,
	updateArticle: updateArticle

};