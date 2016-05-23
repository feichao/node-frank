'use strict';

var marked = require('marked');
var techProxy = require('../proxy/tech.js');

/**
 * 获取文章内容
 */
function getTech(req, res, next) {
	var id = req.params[0];
	if(id) {
		techProxy.findById(id, function(err, doc) {
			if(err || !doc) {
				return next(err);
			}

			doc.body = marked(doc.body);
			res.render('tech', { title: doc.title, blog: doc });
		});
	} else {
		//todo render newest blog
		res.render('tech', { title: 'Welcome', blog: '' });
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

		res.render('tech', { title: 'Welcome', blog: '' });
	});
}

module.exports = {
	getTech: getTech,
	getNewTech: getNewTech,
	postNewTech: postNewTech
}