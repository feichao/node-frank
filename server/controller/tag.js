'use strict';

var ArticleProxy = require('../proxy/article.js');
var Marked = require('../service/marked.js').Marked;

function getTag(req, res, next) {
	var directories, tag = req.params.tag, result = [];

	if(!tag) {
		return next();
	}

	directories = ArticleProxy.getDirectories();

	directories.forEach(function(dYear) {
		dYear.forEach(function(d) {
			if(d.tags.indexOf(tag) !== -1) {
				result.push(d);
			}
		});
	});

	res.render('tag', { 
		title: '标签：' + tag,
		result: result
	});	
}

module.exports = {
	getTag: getTag
};