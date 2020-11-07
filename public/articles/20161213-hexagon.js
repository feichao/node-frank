var hexWrap = document.getElementById('hex-wrap');
var hexDye = document.getElementById('hex-dye');
var transformOrigin = ['left top', 'right top', 'left bottom', 'right bottom', 'center center'];

var PER_LEFT = 30 * 6;
var LEFT_DYE_ODD_ARR = [30, 150];
var LEFT_DYE_EVEN_ARR = [60, 120];

var PER_TOP = 30 * 1.7320508;


function getLeft() {
  return Math.round((hexWrap.offsetWidth * Math.random() / 2) / PER_LEFT) * PER_LEFT;
}

function getTop() {
  return Math.round((hexWrap.offsetHeight * Math.random() / 2) / PER_TOP) * PER_TOP;
}

function getWidth() {
  return (hexWrap.offsetWidth * 0.2) * Math.random() + hexWrap.offsetWidth * 0.2;
}

function getHeight() {
  return (hexWrap.offsetHeight * 0.2) * Math.random() + hexWrap.offsetHeight * 0.2;
}

function lengthPx(fun) {
	if(typeof fun === 'function') {
		return fun() + 'px';
	}

	return fun + 'px';
}

function getPosition() {
	var left;
	var top = getTop();
	if(top % PER_TOP < 0.05) {
		left = getLeft() + LEFT_DYE_EVEN_ARR[Math.round(Math.random())];
	} else {
		left = getLeft() + LEFT_DYE_ODD_ARR[Math.round(Math.random())];
	}

	return {
		left: left,
		top: top
	}
}

var position = getPosition();

hexDye.style.left = lengthPx(position.left);
hexDye.style.top = lengthPx(position.top);
hexDye.style.width = lengthPx(getWidth);
hexDye.style.height = lengthPx(getWidth);

setInterval(function() {
  position = getPosition();

	hexDye.style.left = lengthPx(position.left);
	hexDye.style.top = lengthPx(position.top);

  hexDye.style.width = lengthPx(getWidth);
  hexDye.style.height = lengthPx(getWidth);
  hexDye.style.transformOrigin = transformOrigin[Math.floor(Math.random() * transformOrigin.length)];
}, 10000);