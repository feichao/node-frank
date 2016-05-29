'use strict';

var Marked = require('../service/marked.js').Marked;
var DateTime = require('../util/datetime.js');

var Config = require('../../config.js');
var ArticleProxy = require('../proxy/article.js');

/**
 * 获取文章内容
 */
function getArticle(req, res, next) {
	var id = req.params[0];
	var directories = ArticleProxy.getDirectories();

	var pages = Config.pages.filter(function(p, i) { return i ===0 || i === 3; });
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

/**
 * 新建文章页面
 * get /tech/new
 */
function createArticlePage(req, res, next) {
	res.render('newtech', { title: 'New Tech' });
}

/**
 * 新建文章
 * post /tech/new
 */
function createArticle(req, res, next) {
	req.body.tags = (req.body.tags || '').split(' ').map(function(t) {
		return t.trim();
	});

	ArticleProxy.save(req.body, function(err) {
		if(err) {
			return next(err);
		}

		res.redirect('/article');
	});
}

module.exports = {
	getArticle: getArticle,
	createArticlePage: createArticlePage,
	createArticle: createArticle
};