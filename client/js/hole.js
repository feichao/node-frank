'use strict';

var Ajax = require('./ajax.js');

var holeCreateTextarea;
var holeCreateBtn;
var holeShowReplyBlock;
var holeReplyBlock;
var holeReplyTextarea;
var holeReplyBtn;

$(document).ready(function() {
	holeCreateTextarea = $('#hole-text');
	holeCreateBtn = $('#create-hole');
	holeShowReplyBlock = $('a[name="reply-hole"]');

	holeReplyBlock = $('#reply-block').on('click', function() { return false; });
	holeReplyTextarea = holeReplyBlock.find('textarea');
	holeReplyBtn = $('#reply-btn');

	holeCreateBtn.on('click', createNewHole);
	holeReplyBtn.on('click', replyHole);
	holeShowReplyBlock.on('click', createReplyBlock);


}).on('click', function() {
	holeReplyBlock.removeClass('show');
});

function createNewHole(event) {
	var text = holeCreateTextarea.val();

	if(!text) {
		return Toast.show('请在输入框输入想说的话');
	}

	Ajax.post('/hole/new', {
		content: text
	}, function(data) {
		if(data.code !== 0) {
			Toast.show(data.msg);
		} else {
			window.location.reload();
		}
	});
}

function createReplyBlock(event) {
	var $this = $(this);
	holeReplyTextarea.attr('placeholder', '你想对' + $(this).eq(0).data('name') + '说...');

	holeReplyBlock.appendTo($this.parent()).addClass('show');
	holeReplyTextarea.focus();

	return false;
}

function replyHole(event) {
	var text = holeReplyTextarea.val();
	var refId = holeReplyBlock.parent().data('refid');

	if(!text) {
		return Toast.show('请在输入框输入想回复的话');
	}

	Ajax.post('/hole/new', {
		content: text,
		refId: refId
	}, function(data) {
		if(data.code !== 0) {
			Toast.show(data.msg);
		} else {
			window.location.reload();
		}
	});
}




