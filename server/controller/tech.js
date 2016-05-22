'use strict';

var marked = require('marked');
var techProxy = require('../proxy/tech.js');

function getTech(req, res, next) {
	var id = req.param('id');
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

function getNewTech(req, res, next) {
	res.render('newtech', { title: 'New Tech' });
}

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