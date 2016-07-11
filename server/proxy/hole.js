'use strict';

var Marked = require('../service/marked.js').Marked;

var Tools = require('../util/tools.js');
var DateTime = require('../util/datetime.js');

var Hole = require('../model/hole.js').hole;
var MongoDB = require('../service/mongodb.js').mongoDB;

var HoleCount = 0;

var PAGE_SIZE = 15;

_getHoleCount();

function _getHoleCount() {
  return Hole.count({ refId: null }, function(err, count) {
    if (err) {
      console.log('get hole count err: ' + err);
    } else {
      HoleCount = count;
    }
  });
}

function getHoleCount() {
  return HoleCount;
}

function save(data, callback) {
  var hole = new Hole(data);
  return hole.save(function(err, product, numAffected) {
    if (err) {
      console.log('save hole error: ' + err);
    } else {
      _getHoleCount();
    }

    callback(err);
  });
}

function getHoleList(index, callback) {
  return Hole.find({ refId: null })
    .sort({ date: -1 })
    .skip(index * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .exec(function(err, docs) {
      if (err) {
        console.log('get holelist error: ' + err);
        callback(err);
      } else {
        var length = docs.length,
          count = 0;
        var result = [];

        if (length <= 0) {
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

          Hole.find({ refId: temp.id })
            .sort({ date: -1 })
            .exec(function(err, cDocs) {
              if (err) {
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
              }

              result.push(temp);

              count++;

              if (count === length) {
                callback(null, result);
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

function sortDate(a, b) {
  if (a.date < b.date) {
    return 1;
  } else {
    return -1;
  }
}

module.exports = {
  PAGE_SIZE: PAGE_SIZE,
  save: save,
  getHoleList: getHoleList,
  find: find,
  getHoleCount: getHoleCount
};
