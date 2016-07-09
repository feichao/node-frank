'use strict';

var mongoose = require('mongoose');

var Tools = require('../util/tools.js');
var DateTime = require('../util/datetime.js');

var Hole = require('../model/hole.js').hole;
var MongoDB = require('../service/mongodb.js').mongoDB;


function save(data, callback) {
	console.log(data);
	var hole = new Hole(data);
	return hole.save(function(err, product, numAffected) {
    if(err) {
    	console.log('save hole error: ' + err);
    }

    callback(err);
  });
}

function getHoleList(callback) {
	return Hole.find({refId: null}, function(err, docs) {
		if(err) {
			console.log('get holelist error: ' + err);
			callback(err);
		} else {
			var length = docs.length, count = 0;
			var result = [];

			if(length <= 0) {
				callback(null, result)
			}

			docs.forEach(function(d) {
				var temp = {
					id: d._id,
					date: DateTime.datetime(d.date, 'YYYY-MM-dd HH:mm:ss'),
					name: d.name,
					avatar: d.avatar,
					content: d.content,
					refId: d.refId,
				};

				Hole.find({ refId: temp.id }, function(err, cDocs) {
					if(err) {
						temp.children = [];
					} else {
						temp.children = cDocs.map(function(dd) {
							return {
								id: dd._id,
								date: DateTime.datetime(dd.date, 'YYYY-MM-dd HH:mm:ss'),
								name: dd.name,
								avatar: dd.avatar,
								content: dd.content,
								refId: dd.refId,
							}
						});

						console.log(temp.children);
					}
					
					result.push(temp);

					count++;

					if(count === length) {
						callback(null, result)
					}
				});
			});
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
  getHoleList: getHoleList,
  find: find,
};