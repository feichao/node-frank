'use strict';

var Config = require('../../config.js');

var Mongoose = require('mongoose');
Mongoose.connect(Config.mongoose.url, {
	useMongoClient: true,
});

var mongoDB = Mongoose.connection;
mongoDB.on('error', function(error) {
	console.error('connection mongoose error: ' + error);
	mongoDB = null;
});

module.exports = { mongoDB: mongoDB }