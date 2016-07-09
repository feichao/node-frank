'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');
var HoleUtil = require('../util/hole.js');
var HoleProxy = require('../proxy/hole.js');
var Request = require('../constant/request.js');

function getHole(req, res, next) {
	var index = +req.query.index || 0;

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

	if(!req.cookies.token) {
		res.cookie('token', Tools.getAuthCode(32), {
      maxAge: 1000 * 60 * 60,
      httpOnly: true
    });
	}

	var count = Math.ceil(HoleProxy.getHoleCount() / HoleProxy.PAGE_SIZE);

	if(index >= count) {
		return res.redirect('/hole?index=' + (count - 1));
	}

	HoleProxy.getHoleList(index, function(err, docs) {
		var pre = +index - 1;
		var next = +index + 1;

		if(!err) {
			res.render('hole', { 
				title: '温柔乡',
				name: name,
				avatar: avatar,
				holeList: docs,
				paging: {
					count: count,
					index: index,
					pre: pre < 0 ? 0 : pre,
					next: next > count ? count : next
				}
			});
		} else {
			return next(err);
		}
	});
}

function saveHole(req, res, next) {
	var sess = req.session;
	if(!req.cookies.token) {
		return res.json(Request.Error.HOLE.INVALID_SESSION);
	}

	var now = +new Date();
	if(now - sess.holeTimestamp < 10 * 1000) {
		return res.json(Request.Error.HOLE.TOO_FAST);
	}

	req.session.holeTimestamp = +new Date();

	var name = req.cookies.holeName;
	var avatar = req.cookies.holeAvatar;
	var refId = req.body.refId;
	var content = req.body.content;

	if(!content) {
		return res.json(Request.Error.HOLE.EMPTY_CONTENT);
	}

	if(!name) {
		name = HoleUtil.getName();

		res.cookie('holeName', name, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
	}

	if(!avatar) {
		avatar = HoleUtil.getAvatar();

		res.cookie('holeAvatar', avatar, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    });
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