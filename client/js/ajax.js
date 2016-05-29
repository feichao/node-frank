'use strict';

module.exports = {
  get: function(url, callback) {
    $.ajax({
      method: 'GET',
      url: url,
      success: function() {
      	callback(data);
      },
      error: function() {
				callback({
      		code: -1,
      		msg: '可能是网络问题'
      	});
      }
    });
  },

  post: function(url, data, callback) {
  	$.ajax({
      method: 'POST',
      url: url,
      data: data,
      success: function(data, text, xhr) {
      	callback(data);
      },
      error: function(xhr) {
      	callback({
      		code: -1,
      		msg: '可能是网络问题'
      	});
      }
    });
  }
}
