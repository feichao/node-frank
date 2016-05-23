'use strict';

function gCallback(callback) {
	if(typeof callback === 'function') {
		callback.apply(null, [].slice.call(arguments, 1));
	} else {
		console.log('in gCallback: callback must be a function!');
	}
}

module.exports = {
	gCallback: gCallback
};