'use strict';

var Marked = require('../service/marked.js').Marked;
var DateTime = require('../util/datetime.js');

var Config = require('../../config.js');
var ArticleProxy = require('../proxy/article.js');
var Request = require('../constant/request.js');

var category = 0;

/**
 * 获取文章内容
 */
function getArticle(req, res, next) {
	category = category || 0;

	var id = req.params[0];
	var directories = ArticleProxy.getDirectories().map(function(d) {
		return d.filter(function(dd) {
			return dd.category === category;
		});
	}).filter(function(d) {
		return d.length > 0;
	});

	var pages = Config.pages.filter(function(p, i) { return i === 0 || i === 3; });
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
					title: doc.title,
					author: doc.author,
					category: doc.category,
					tags: doc.tags,
					date: DateTime.datetime(doc.date),
					update: DateTime.datetime(doc.update),
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

function getArticleStory(req, res, next) {
	category = 1;
	getArticle(req, res, next);
	category = 0;
}

/**
 * 新建文章页面
 */
function createArticlePage(req, res, next) {
	var categories = Config.categories;

	res.render('newarticle', { 
		title: '新建文章',
		categories: categories
	});
}

/**
 * 新建文章
 */
function createArticle(req, res, next) {
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
	createArticlePage: createArticlePage,
	createArticle: createArticle
};