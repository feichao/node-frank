'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var directorySchema = new Schema({
  // Blog Id
  blogId: Schema.Types.ObjectId,

	// 年
  year: Number,

  // 月
  month: Number,

  // 日
  day: Number,

  // 时间
  time: String
});

module.exports = {
  Directory: mongoose.model('Directory', directorySchema)
}