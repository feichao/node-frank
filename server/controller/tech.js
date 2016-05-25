'use strict';

var marked = require('marked');
var highlight = require('highlight.js');

var Util = require('../util/util.js');
var techProxy = require('../proxy/tech.js');

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

/**
 * 获取文章内容
 */
function getTech(req, res, next) {
	var id = req.params[0];
	var directories = techProxy.getDirectories();

	if(id) {
		techProxy.findById(id, function(err, doc) {
			if(err || !doc) {
				return next(err);
			}

			res.render('tech', { 
				title: doc.title,
				directory: directories,
				blog: {
					title: doc.title,
					author: doc.author,
					category: doc.category,
					tags: doc.tags,
					date: Util.getDateTime(doc.date),
					update: Util.getDateTime(doc.update),
					body: marked(doc.body)
				}
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
function getNewTech(req, res, next) {
	res.render('newtech', { title: 'New Tech' });
}

/**
 * 新建文章
 * post /tech/new
 */
function postNewTech(req, res, next) {
	req.body.tags = (req.body.tags || '').split(' ').map(function(t) {
		return t.trim();
	});

	techProxy.save(req.body, function(err) {
		if(err) {
			return next(err);
		}

		res.redirect('/tech');
	});
}

module.exports = {
	getTech: getTech,
	getNewTech: getNewTech,
	postNewTech: postNewTech
}