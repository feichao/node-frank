'use strict';

(function(global) {

	var aDigit = [
		'<span class="digit-dance">',
		'	<span class="outer-span">',
		'		<span class="inner-span">0</span>',
		'		<span class="inner-span">1</span>',
		'		<span class="inner-span">2</span>',
		'		<span class="inner-span">3</span>',
		'		<span class="inner-span">4</span>',
		'		<span class="inner-span">5</span>',
		'		<span class="inner-span">6</span>',
		'		<span class="inner-span">7</span>',
		'		<span class="inner-span">8</span>',
		'		<span class="inner-span">9</span>',
		'	</span>',
		'</span>'
	].join('');

	function get0Str(num) {
		var r = '';
		for(; num > 0; num--) {
			r += '0';
		}

		return r;
	}

	function DigitDance(element, options) {
		if(!(element instanceof HTMLElement)) {
			return console.error('初始化 DigitDance 实例，第一个参数必须是绑定的 DOM 元素');
		}

		this.element = element;
	}

	DigitDance.prototype.setDigitBits = function(bits) {
		var i = 0, html = '';

		for(i = 0; i < bits; i++) {
			html = html.concat(aDigit);
		}

		this.element.innerHTML = html;
	};

	DigitDance.prototype.setNumber = function(num) {
		var bits = this.element.childElementCount;
		var result = get0Str(bits).concat(num).slice(-bits).split('');

		result.forEach((function(r, i) {
			this.element.children[i].children[0].style.transform = 'translateY(-' + (r * 10) + '%)';
		}).bind(this));
	};

	global.DigitDance = global.DigitDance || DigitDance;

})(window);




