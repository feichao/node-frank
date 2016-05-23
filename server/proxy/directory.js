'use strict';

var Util = require('../util/util.js');

var Directory = require('../model/directory.js').Directory;
var DB = require('../db/db.js').db;

var DirectoryData = {};

generate();

function save(data, callback) {
	var dataNew = {
		blogId: data.blogId,
		blogTitle: data.blogTitle,
		blogAuthor: data.blogAuthor,
		year: data.date.getFullYear(),
		month: data.date.getMonth() + 1,
		day: data.date.getDate(),
		time: Util.getTime(data.date)
	};

  var directoryTemp = new Directory(dataNew);
  return directoryTemp.save(function(err, product, numAffected) {
  	generate(callback);
  });
}

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
	DirectoryData = {};
	find({}, function(err, docs) {
		if(err || !docs) {
			if(typeof callback === 'function') {
				callback(err);
			} else {
				console.log('generate directory err: ' + err);
			}
		} else {
			(docs || []).forEach(function(d) {
				DirectoryData[d.year] = DirectoryData[d.year] || [];

				DirectoryData[d.year].push({
					title: d.blogTitle,
					author: d.blogAuthor,
					date: d.year + '-' + d.month + '-' + d.day + ' ' + d.time,
					href: '/tech/0/' + d.blogId
				});
			});

			if(typeof callback === 'function') {
				callback();
			}
		}
	});
}

module.exports = {
	DirectoryData: DirectoryData,
  save: save,
  find: find,
  findById: findById
};