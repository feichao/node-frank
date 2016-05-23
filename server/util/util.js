'use strict';

function gCallback(callback) {
	if(typeof callback === 'function') {
		callback.apply(null, [].slice.call(arguments, 1));
	} else {
		console.log('in gCallback: callback must be a function!');
	}
}

function getDateTime(date) {
	if(date instanceof Date) {
	  var year = date.getFullYear();
	  var month = (date.getMonth() + 1).toString();
	  var day = date.getDate().toString();
	  var hour = date.getHours().toString();
	  var min = date.getMinutes().toString();
	  var seconds = date.getSeconds().toString();

	  month = month.length === 1 ? '0' + month : month;
	  day = day.length === 1 ? '0' + day : day;
	  hour = hour.length === 1 ? '0' + hour : hour;
	  min = min.length === 1 ? '0' + min : min;
	  seconds = seconds.length === 1 ? '0' + seconds : seconds;

	  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + seconds;
	}

	console.log('in getDateTime: date should be Date type');
	return '1970-01-01 00:00:00';
}

function getTime(date) {
	if(date instanceof Date) {
		var hour = date.getHours().toString();
	  var min = date.getMinutes().toString();
	  var seconds = date.getSeconds().toString();

	  hour = hour.length === 1 ? '0' + hour : hour;
	  min = min.length === 1 ? '0' + min : min;
	  seconds = seconds.length === 1 ? '0' + seconds : seconds;

	  return hour + ':' + min + ':' + seconds;
	}

	console.log('in getTime: date should be Date type');
	return '00:00:00';
}

module.exports = {
	gCallback: gCallback,
	getDateTime: getDateTime,
	getTime: getTime
};