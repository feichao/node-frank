'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');

function getAbout(req, res, next) {
	res.render('about', { title: '关于の' });	
}

function getJsonAbout(req, res, next) {
	res.json({
		code: 0,
		msg: ''
	});	
}

module.exports = {
	getAbout: getAbout,
	getJsonAbout: getJsonAbout
};