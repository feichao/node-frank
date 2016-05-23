'use strict';

var Util = require('../util/util.js');

var Blog = require('../model/tech.js').Blog;
var DB = require('../db/db.js').db;

function save(data, callback) {
  var blogTemp = new Blog(data);
  var directoryProxy = require('./directory.js');

  return blogTemp.save(function(err, product, numAffected) {
    if(err) {
    	callback(err);
    	return console.log('save blog error: ' + err);
    }

    directoryProxy.save({
    	blogId: product._id,
      blogTitle: product.title,
      blogAuthor: product.author,
    	date: product.date
    }, callback);
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

module.exports = {
  save: save,
  find: find,
  findById: findById
};