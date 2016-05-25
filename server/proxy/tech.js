'use strict';

var Util = require('../util/util.js');

var Blog = require('../model/tech.js').Blog;
var DB = require('../db/db.js').db;

var Directories = [];

generateDirectories();

function save(data, callback) {
  var blogTemp = new Blog(data);

  return blogTemp.save(function(err, product, numAffected) {
    if(err) {
    	callback(err);
    	return console.log('save blog error: ' + err);
    }
    
    generateDirectories(callback);
  });
}

function find(data, callback) {
	return Blog.find(data, function(err, doc) {
		Util.gCallback(callback, err, doc);
	});
}

function findById(id, callback) {
	return Blog.findById(id, function(err, doc) {
		Util.gCallback(callback, err, doc);
	});
}

function findLastest(callback) {
	return Blog.findById(id, function(err, doc) {
		Util.gCallback(callback, err, doc);
	});
}

function generateDirectories(callback) {
  Directories = [];
  
  var query = find().sort({date: -1});
  query.exec(function(err, docs) {
    if(err || !docs) {
			if(typeof callback === 'function') {
				callback(err);
			} else {
				console.log('generate directory err: ' + err);
			}
		} else {
			var temp = {};
      var year;
			docs.forEach(function(d) {
        year = d.date.getFullYear();
				temp[year] = temp[year] || [];

				temp[year].push({
					title: d.title,
					author: d.author,
					date: Util.getDateTime(d.date),
          year: year,
					href: '/tech/0/' + d._id
				});
				
				if(Directories.indexOf(temp[year]) === -1) {
					Directories.push(temp[year]);
				}
			});

			if(typeof callback === 'function') {
				callback();
			}
    }
  });
}

function getDirectories() {
  return Directories;
}

module.exports = {
  save: save,
  find: find,
  findById: findById,
  getDirectories: getDirectories
};