'use strict';

var config = require('../../config.js');

var mongoose = require('mongoose');
mongoose.connect(config.mongoose.url);

var db = mongoose.connection;
db.on('error', function(error) {
	console.error('connection mongoose error: ' + error);
	db = null;
});

module.exports = { db: db }