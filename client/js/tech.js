'use strict';

var yearList;
var globalSummary;
var showSummaryTimeout;
var winHeight = $(window).height();

var $doc = $(document).ready(function() {
	yearList = $('.list-year > li').hover(showSummary, hideSummary);
	globalSummary = $('#global-summary');
});

function showSummary(event) {
	var left = 'auto', top = 'auto', bottom = 'auto';

	var $this = $(this);
	var pos = $this.position();
	var h = $this.height();

	left = pos.left;
	console.log(pos.top);
	if(winHeight - (pos.top + h) < 200) {
		bottom = pos.top;
	} else {
		top = pos.top + h;
	}

	var summaryHtml = $this.find('.summary').html();
	//console.log(summaryHtml.trim() === '');
	if(summaryHtml) {
		//console.log('show')
		showSummaryTimeout = setTimeout(function() {
			globalSummary.html(summaryHtml).css({
				left: left,
				top: top,
				bottom: bottom
			}).fadeIn('fast');
		}, 600);
	}
}

function hideSummary(event) {
	showSummaryTimeout && clearTimeout(showSummaryTimeout);
	globalSummary.fadeOut('fast');
}
