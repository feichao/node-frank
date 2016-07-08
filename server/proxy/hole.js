'use strict';

var Tools = require('../util/tools.js');
var DateTime = require('../util/datetime.js');

var Hole = require('../model/hole.js').hole;
var MongoDB = require('../service/mongodb.js').mongoDB;


function save(data, callback) {
	var hole = new Hole(data);
	return hole.save(function(err, product, numAffected) {
    if(err) {
    	callback(err);
    	return console.log('save hole error: ' + err);
    }
    
  });
}

function find(data, callback) {
	return Hole.find(data, function(err, doc) {
		Tools.gCallback(callback, err, doc);
	});
}

function findById(id, callback) {
	return Hole.findById(id, function(err, doc) {
		Tools.gCallback(callback, err, doc);
	});
}

module.exports = {
  save: save,
  find: find,
  findById: findById,
  getDirectories: getDirectories
};