'use strict';

var tagBlocks;

$(document).ready(function() {
	var wrap = $('#tag-page-wrap');
	tagBlocks = wrap.find('li');

	wrap.find('p').each(function(index, p) {
		var $p = $(p);
		if(!$.trim($p.text())) {
			$p.remove();
		}
	});

	showBlocks();
});

function showBlocks() {
	var length = tagBlocks.length;

	var i = length, num, arr = [], result = [], index;

	for(i = 0; i < length; i++) {
		arr.push(i);
	}

	while(i > 0) {
		index = Math.floor(Math.random() * i);
		result.push(arr[index]);
		arr.splice(index, 1);
		i--;
	}

	$.each(result, function(index, r) {
		var $item = $(tagBlocks[r]);
		$item.delay(100 + Math.random() * 1000).fadeIn(function() {
			$item.addClass('animation');
		});
	});
}