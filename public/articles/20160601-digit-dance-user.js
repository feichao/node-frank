window.onload = function () {
	function getRandomStr(num) {
		var r = '';
		for (; num > 0; num--) {
			r += Math.floor(Math.random() * 10);
		}

		return r;
	}

	var digitDanceEle = document.getElementById('digit-dance');
	var digitDanceEle1 = document.getElementById('digit-dance-1');

	var digitDance = new DigitDance(digitDanceEle);
	var digitDance1 = new DigitDance(digitDanceEle1);

	digitDance.setDigitBits(10);
	digitDance1.setDigitBits(30);

	setInterval(function () {
		digitDance.setNumber(getRandomStr(10));
	}, 3000);

	setInterval(function () {
		digitDance1.setNumber(getRandomStr(30));
	}, 5000);
};