var main = require('../css/main.scss');

window.Toast = window.Toast || {};

var toast;
var toastMsg;
var toastTimeout;

$(document).ready(function() {
	toast = $('#toast');
	toastMsg = $('#toast-msg');
});

window.Toast.show = function(msg, timeout) {
	toastMsg.text(msg);
	toast.fadeIn();

	toastTimeout && clearTimeout(toastTimeout);

	toastTimeout = setTimeout(function() {
		toast.fadeOut();
	}, timeout || 4000);
}