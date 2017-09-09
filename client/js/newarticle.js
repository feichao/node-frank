'use strict';

var Ajax = require('./ajax.js');

var authcodeBtn;
var phoneInput;
var submitFrom;
var editorPlaceholder;
var editorContent;
var editor;

$(document).ready(function() {
	authcodeBtn = $('#authcode');
	phoneInput = $('input[name="phone"]');
	submitFrom = $('#submit-artical');
	editorPlaceholder = $('#wang-editor-placeholder');
	editorContent = $('#wang-editor-content');

	authcodeBtn.on('click', getAuthcode);
	submitFrom.submit(submitArtical);

	editor = new window.wangEditor('#wang-editor');
	editor.customConfig.uploadImgShowBase64 = true;
	editor.customConfig.zIndex = 999;
	editor.customConfig.onchange = editorChanged;
	editor.create();
});

function editorChanged() {
	if (editor.txt.text()) {
		editorPlaceholder.hide();
	} else {
		editorPlaceholder.show();
	}
	editorContent.val(editor.txt.html());
}

function disabledBtn($btn) {
	var timeout = 60;
	var interval;

	$btn.prop('disabled', true).text(timeout + '秒');

	interval = setInterval(function() {
		timeout--;

		if(timeout <= 0) {
			interval && clearInterval(interval);
			$btn.prop('disabled', false).text('获取');
			return;
		}

		$btn.text((timeout.toString().length === 2 ? '' : '0') + timeout + '秒');
	}, 1000);
}

function getAuthcode(event) {
	var $this = $(this);
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
			Toast.show('发送成功，2 小时内有效，最多使用 5 次');
			disabledBtn($this);
		}
	});
}

function submitArtical(event) {
	event.preventDefault();

	var $this = $(this);
	var category = document.forms[0].category.value;

	Ajax.post('/article/new', $this.serialize(), function(data) {
		if(data.code !== 0) {
			Toast.show(data.msg);
		} else {
			window.location = $this.data('referer') || (category === '0' ? '/article' : '/story');
		}
	});
}