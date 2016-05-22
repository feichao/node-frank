'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/0xfc');

var db = mongoose.connection;
db.on('error', function(error) {
	console.error('connection mongoose error: ' + error);
	db = null;
});

module.exports = { db: db }