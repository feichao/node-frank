'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
	// 标题
  title: String,

  // 作者
  author: String,

  // 分类
  category: Number,

  // 摘要
  summary: String,

  // 内容
  body: String,

  // 创建日期
  date: { type: Date, default: Date.now },

  // 更细日期
  update: { type: Date, default: Date.now },

  // 评论

  // 是否隐藏
  hidden: Boolean,

  // 赞
  favs: Number,

  // 讨厌
  unfavs: Number,

  // 标签
  tags: [String],

  // 文章依赖的 JS 文件
  js: [String],

  // 文章依赖的 CSS 文件
  css: [String],

  isRichEditor: { type: Boolean, default: false },
});

module.exports = {
	article: mongoose.model('article', articleSchema)
}