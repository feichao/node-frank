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

function getAuthCode(length, phone) {
	var time = new Date().valueOf();
	var str = '123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';

	var len = length || 5;

	return [0, 0, 0, 0, 0].map(function(c) {
		return str[Math.floor(Math.random() * 59)];
	}).join('');
}

module.exports = {
	gCallback: gCallback,
	getArrRandomVal: getArrRandomVal,
	getAuthCode: getAuthCode
};