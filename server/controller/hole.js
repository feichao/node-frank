'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');
var HoleUtil = require('../util/hole.js');

function getHole(req, res, next) {
	var name = req.cookies.holeName;
	if(!name) {
		name = HoleUtil.getName();

		res.cookie('holeName', name, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
	}

	var avatar = req.cookies.holeAvatar;
	if(!avatar) {
		avatar = HoleUtil.getAvatar();

		res.cookie('holeAvatar', avatar, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
	}

	res.render('hole', { 
		title: '温柔乡',
		name: name,
		avatar: avatar
	});
}

function saveHole(req, res, next) {
	var name = req.cookies.holeName;
	var avatar = req.cookies.holeAvatar;


}

module.exports = {
	getHole: getHole
};