'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');

function getIndex(req, res, next) {
	var pages = Config.pages;
	var titles = Config.titles;
	var connects = Config.connects;

	res.render('index', {
		title: Tools.getArrRandomVal(titles),
		pages: pages,
		connects: connects
	});
}

module.exports = {
	getIndex: getIndex
};