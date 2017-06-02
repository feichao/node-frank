'use strict';

var Config = require('../../config.js');
var Tools = require('../util/tools.js');
var HoleUtil = require('../util/hole.js');
var HoleProxy = require('../proxy/hole.js');
var Request = require('../constant/request.js');

function setHoleCookie(req, res) {
	var name = req.cookies.holeName;
	if (!name) {
		name = HoleUtil.getName();

		res.cookie('holeName', name, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true
		});
	}

	var avatar = req.cookies.holeAvatar;
	if (!avatar) {
		avatar = HoleUtil.getAvatar();

		res.cookie('holeAvatar', avatar, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true
		});
	}

	if (!req.cookies.token) {
		res.cookie('token', Tools.getAuthCode(32), {
			maxAge: 1000 * 60 * 60,
			httpOnly: true
		});
	}

	return {
		name: name,
		avatar: avatar
	};
}

function getHole(req, res, next) {
	var index = +req.query.index || 0;
	var count = Math.ceil(HoleProxy.getHoleCount() / HoleProxy.PAGE_SIZE);

	if (index >= count) {
		return res.redirect('/hole?index=' + (count - 1));
	}

	var cooInfo = setHoleCookie(req, res);

	HoleProxy.getHoleList(index, function (err, docs) {
		var pre = +index - 1;
		var next = +index + 1;

		if (!err) {
			res.render('hole', {
				title: '温柔乡',
				name: cooInfo.name,
				avatar: cooInfo.avatar,
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

function getJsonHole(req, res, next) {
	var index = +req.query.index || 0;
	var total = HoleProxy.getHoleCount();
	var pageSize = HoleProxy.PAGE_SIZE;
	var count = Math.ceil(total / pageSize);

	var cooInfo = setHoleCookie(req, res);

	if (index >= count) {
		return res.json({
			code: 0,
			msg: '',
			data: {
				name: cooInfo.name,
				avatar: cooInfo.avatar,
				total: total,
				pagesize: pageSize,
				index: index,
				holes: []
			}
		});
	}

	HoleProxy.getHoleList(index, function (err, docs) {
		if (!err) {
			return res.json({
				code: 0,
				msg: '',
				data: {
					name: cooInfo.name,
					avatar: cooInfo.avatar,
					total: total,
					index: index,
					pagesize: pageSize,
					holes: docs
				}
			});
		} else {
			return res.json({
				code: Request.Error.DB_ERROR,
				msg: '获取数据失败，请稍后再试',
				data: {
					name: cooInfo.name,
					avatar: cooInfo.avatar,
					total: total,
					index: index,
					pagesize: pageSize,
					holes: []
				}
			});
		}
	});
}

function saveHole(req, res, next) {
	var sess = req.session;
	if (!req.cookies.token) {
		return res.json(Request.Error.HOLE.INVALID_SESSION);
	}

	var now = +new Date();
	if (now - sess.holeTimestamp < 10 * 1000) {
		return res.json(Request.Error.HOLE.TOO_FAST);
	}

	req.session.holeTimestamp = +new Date();

	var name = req.cookies.holeName;
	var avatar = req.cookies.holeAvatar;
	var refId = req.body.refId;
	var content = req.body.content;

	if (!content) {
		return res.json(Request.Error.HOLE.EMPTY_CONTENT);
	}

	if (!name) {
		name = HoleUtil.getName();

		res.cookie('holeName', name, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true
		});
	}

	if (!avatar) {
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
	}, function (err) {
		if (err) {
			res.json(Request.Error.HOLE.ERROR);
		} else {
			res.json(Request.Ok);
		}
	});
}

module.exports = {
	getHole: getHole,
	saveHole: saveHole,
	getJsonHole: getJsonHole
};