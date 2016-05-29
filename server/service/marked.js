'use strict';

var Marked = require('marked');
var Highlight = require('highlight.js');

Marked.setOptions({
  highlight: function (code) {
    return Highlight.highlightAuto(code).value;
  }
});

module.exports = {
	Marked: Marked,
};