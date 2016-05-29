'use strict';

var Ajax = require('./ajax.js');

var authcodeBtn;
var phoneInput;

$(document).ready(function() {
	authcodeBtn = $('#authcode');
	phoneInput = $('input[name="phone"]');

	authcodeBtn.on('click', getAuthcode);
});

function getAuthcode() {
	var phone = phoneInput.val();

	if(!/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
		return Toast.show('输入正确的手机号');
	}

	Ajax.post('/article/authcode', {
		phone: phone
	}, function(data) {
		if(data.code !== 0) {
			Toast.show(data.msg);
		} else {
			Toast.show('发送成功');
		}
	});
}