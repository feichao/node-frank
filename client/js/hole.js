'use strict';

var Ajax = require('./ajax.js');

var holeCreateText;
var holeCreateBtn;
var holeReplayBtn;

$(document).ready(function() {
	holeCreateText = $('#hole-text');
	holeCreateBtn = $('#create-hole');
	holeReplayBtn = $('a[name="reply-hole"]');

	holeCreateBtn.on('click', createNewHole);
	holeReplayBtn.on('click', createNewHole)
});

function createNewHole(event) {
	var text = holeCreateText.val();
	var refId = $(this).eq(0).data('refid');

	if(!text) {
		return Toast.show('请输入内容');
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