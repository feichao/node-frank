'use strict';

var Marked = require('../service/marked.js').Marked;

var Tools = require('../util/tools.js');
var DateTime = require('../util/datetime.js');

var Article = require('../model/article.js').article;
var MongoDB = require('../service/mongodb.js').mongoDB;

var Directories = [];

generateDirectories();

function save(data, callback) {
  var article = new Article(data);

  return article.save(function(err, product, numAffected) {
    if(err) {
    	callback(err);
    	return console.log('save blog error: ' + err);
    }
    
    generateDirectories(callback);
  });
}

function find(data, callback) {
	return Article.find(data, function(err, doc) {
		Tools.gCallback(callback, err, doc);
	});
}

function findById(id, callback) {
	return Article.findById(id, function(err, doc) {
		Tools.gCallback(callback, err, doc);
	});
}

function generateDirectories(callback) {
  Directories = [];
  
  var query = find().sort({date: -1});
  query.exec(function(err, docs) {
  	console.log(docs);
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
					date: DateTime.datetime(d.date, 'YYYY-MM-dd HH:mm:ss'),
          year: year,
          summary: Marked(d.summary || ''),
					href: '/article/0/' + d._id
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