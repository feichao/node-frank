'use strict';

var Util = require('../util/util.js');

var Directory = require('../model/directory.js').Directory;
var DB = require('../db/db.js').db;

var techProxy = require('./tech.js');

var DirectoryData = {};


function save(data, callback) {
	var dataNew = {
		blogId: data.blogId,
		year: data.date.getFullYear(),
		month: data.date.getMonth(),
		day: data.date.getDate(),
		time: data.date.getHours() + ':' + data.date.getMinutes() + ':' + data.date.getSeconds()
	};

  var directoryTemp = new Directory(dataNew);
  return directoryTemp.save(function(err, product, numAffected) {
    if(err) {
    	callback(err);
    	return console.log('save directory error: ' + err);
    }

    console.log('save success');

    generate(callback);
  });
}

save({
	blogId: '574149de9611332406c7934e',
	date: new Date()
});

function find(data, callback) {
	return Directory.find(data, function(err, doc) {
		Util.gCallback(callback, err, doc);
	});
}

function findById(id, callback) {
	return Directory.findById(id, function(err, doc) {
		Util.gCallback(callback, err, doc);
	});
}

function generate(callback) {
	find({}, function(err, docs) {
		if(err) {
			callback(err);
			return console.log('generate directory error: ' + err);
		}

		console.log(techProxy);
		(docs || []).forEach(function(d) {
			DirectoryData[d.year] = DirectoryData[d.year] || [];
			techProxy.findById(d.blogId, function(err, doc) {
				DirectoryData[d.year].push({
					title: doc.title,
					date: doc.date,
					update: doc.update,
					href: '/tech?id=' + doc._id
				});
			});
		});

		callback();

	}); 
}

module.exports = {
	DirectoryData: DirectoryData,
  save: save,
  find: find,
  findById: findById
};