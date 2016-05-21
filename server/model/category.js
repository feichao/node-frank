'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
  // Id
  id: Number,

	// 分类名
  category: String
});