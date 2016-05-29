'use strict';

var ALiDaYu = require('../../config.js').aLiDaYu;

function isPhone(num) {
	return /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(num);
}

function isIllegal(num) {
	var phoneList = ALiDaYu.phoneList;
	if(!phoneList || !(phoneList instanceof Array)) {
		console.log('请在 config.js 中配置允许接收验证码的手机号列表');
		return;
	}

	if(phoneList.indexOf(num) === -1) {
		return false;
	}

	return true;
}

module.exports = {
	isPhone: isPhone,
	isIllegal: isIllegal
};