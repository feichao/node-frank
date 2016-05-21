'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  // Blog Id
  blogId: Schema.Types.ObjectId,

	// 用户昵称
  nickname: String,

  // 邮箱
  email: String,

  // 日期
  date: Date,

  // 内容
  body: String
});