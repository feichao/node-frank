'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');
var HoleUtil = require('../util/hole.js');
var HoleProxy = require('../proxy/hole.js');
var Request = require('../constant/request.js');

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

	HoleProxy.getHoleList(function(err, docs) {
		// console.log(docs);
		if(!err) {
			res.render('hole', { 
				title: '温柔乡',
				name: name,
				avatar: avatar,
				holeList: docs
			});
		} else {
			return next(err);
		}
	});
}

function saveHole(req, res, next) {
	var name = req.cookies.holeName;
	var avatar = req.cookies.holeAvatar;
	var refId = req.body.refId;
	var content = req.body.content;

	if(!content) {
		return res.json(Request.Error.HOLE.EMPTY_CONTENT);
	}

	HoleProxy.save({
		refId: refId || undefined,
	  name: name,
	  avatar: avatar,
	  content: content
	}, function(err) {
		if(err) {
			res.json(Request.Error.HOLE.ERROR);
		} else {
			res.json(Request.Ok);
		}
	});
}

module.exports = {
	getHole: getHole,
	saveHole: saveHole
};