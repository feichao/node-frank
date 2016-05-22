'use strict';

var Blog = require('../model/tech.js').Blog;
var DB = require('../db/db.js').db;

function gCallback(callback) {
	if(typeof callback === 'function') {
		callback.apply(null, [].slice.call(arguments, 1));
	}
}

function save(data, callback) {
  var blogTemp = new Blog(data);
  return blogTemp.save(function(err, product, numAffected) {
    gCallback(callback, err, product, numAffected);
  });
}

function find(data, callback) {
	return Blog.find(data, function(err, doc) {
		gCallback(callback, err, doc);
	});
}

function findById(id, callback) {
	return Blog.findById(id, function(err, doc) {
		gCallback(callback, err, doc);
	});
}

module.exports = {
  save: save,
  find: find,
  findById: findById
};