'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');

function getAbout(req, res, next) {
	res.render('about', { title: '关于' });	
}

module.exports = {
	getAbout: getAbout
};