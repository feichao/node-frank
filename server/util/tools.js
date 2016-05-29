'use strict';

function gCallback(callback) {
	if(typeof callback === 'function') {
		callback.apply(null, [].slice.call(arguments, 1));
	} else {
		console.log('in gCallback: callback must be a function!');
	}
}

function getArrRandomVal(array) {
	var length;

	if(typeof array === 'string') {
		return array;
	}

	if(array instanceof Array) {
		length = array.length;

		return array[Math.floor(Math.random() * length)];
	}

	return '';
}

module.exports = {
	gCallback: gCallback,
	getArrRandomVal: getArrRandomVal
};