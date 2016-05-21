'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var directorySchema = new Schema({
  // Blog Id
  blogId: Schema.Types.ObjectId,

	// 用户昵称
  year: Number,

  // 邮箱
  month: Number,

  // 日期
  day: Number,

  // 内容
  time: String
});