'use strict';

var Marked = require('../service/marked.js').Marked;

var Tools = require('../util/tools.js');
var DateTime = require('../util/datetime.js');

var Article = require('../model/article.js').article;
var MongoDB = require('../service/mongodb.js').mongoDB;

var DirectoriesObj = {}, Directories = [];

generateDirectories();

function save(data, callback) {
	var article;

	if(data.id) {
		data.update = new Date();
		return Article.findByIdAndUpdate(data.id, data, function(err, doc) {
	    if(err) {
	    	callback(err);
	    	return console.log('save blog error: ' + err);
	    }
	    
	    generateDirectories(callback);
	  });
	} else {
		article = new Article(data);
		return article.save(function(err, product, numAffected) {
	    if(err) {
	    	callback(err);
	    	return console.log('save blog error: ' + err);
	    }
	    
	    generateDirectories(callback);
	  });
	}
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
          category: d.category,
          summary: Marked(d.summary || ''),
          tags: d.tags,
					href: (d.category === 0 ? '/article/0/' : '/story/0/') + d._id
				});

				
				if(Directories.indexOf(temp[year]) === -1) {
					Directories.push(temp[year]);
				}
			});

			DirectoriesObj.all = Directories;

			DirectoriesObj[0] = Directories.map(function(d) {
				return d.filter(function(dd) {
					return dd.category === 0;
				});
			}).filter(function(d) {
				return d.length > 0;
			});

			DirectoriesObj[1] = Directories.map(function(d) {
				return d.filter(function(dd) {
					return dd.category === 1;
				});
			}).filter(function(d) {
				return d.length > 0;
			});

			DirectoriesObj.newest = docs.sort(function(a, b) {
				return b.date - a.date;
			}).map(function(d){
				return {
					title: d.title,
					author: d.author,
					date: DateTime.datetime(d.date, 'YYYY-MM-dd HH:mm:ss'),
          category: d.category,
					href: (d.category === 0 ? '/article/0/' : '/story/0/') + d._id
				};
			}).filter(function(d, index) {
				return index < 5;
			});

			DirectoriesObj.update = docs.sort(function(a, b) {
				return b.update - a.update;
			}).map(function(d){
				return {
					title: d.title,
					author: d.author,
					update: DateTime.datetime(d.update, 'YYYY-MM-dd HH:mm:ss'),
          category: d.category,
					href: (d.category === 0 ? '/article/0/' : '/story/0/') + d._id
				};
			}).filter(function(d, index) {
				return index < 5;
			});

			if(typeof callback === 'function') {
				callback();
			}
    }
  });
}

function getDirectories(category) {

	if(typeof category === 'undefined') {
		return Directories;
	}

	return DirectoriesObj[category];
}

module.exports = {
  save: save,
  find: find,
  findById: findById,
  getDirectories: getDirectories
};