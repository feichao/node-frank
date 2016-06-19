'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');

var ArticleProxy = require('../proxy/article.js');

function getIndex(req, res, next) {
	var pages = Config.pages;
	var titles = Config.titles;
	var connects = Config.connects;

	var newestArticle = ArticleProxy.getDirectories('newest');
	var updateArticle = ArticleProxy.getDirectories('update');

	res.render('index', {
		title: Tools.getArrRandomVal(titles),
		pages: pages,
		connects: connects,
		newest: newestArticle,
		update: updateArticle
	});
}

module.exports = {
	getIndex: getIndex
};