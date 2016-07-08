'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var holeSchema = new Schema({

  refId: Schema.Types.ObjectId,

	// 名字
  name: String,

  // 头像
  avatar: String,

  // 日期
  date: { type: Date, default: Date.now },

  content: String
});

module.exports = {
  hole: mongoose.model('hole', holeSchema)
};