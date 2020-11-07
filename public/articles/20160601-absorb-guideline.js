'use strict';

(function (global) {
  function GuideLines(params) {
    this.vlines = params && params.vlines || [];
    this.hlines = params && params.hlines || [];
  }

  GuideLines.prototype.addHlines = function () {
    Array.prototype.forEach.call(arguments, (function (l) {
      if (this.hlines.indexOf(l) === -1) {
        this.hlines.push(l);
      }
    }).bind(this));
  };

  GuideLines.prototype.removeHlines = function () {
    var index;
    Array.prototype.forEach.call(arguments, (function (l) {
      if ((index = this.hlines.indexOf(l)) !== -1) {
        this.hlines.splice(index, 1);
      }
    }).bind(this));
  };

  GuideLines.prototype.clearHlines = function () {
    this.hlines = [];
  };

  GuideLines.prototype.addVlines = function () {
    Array.prototype.forEach.call(arguments, (function (l) {
      if (this.vlines.indexOf(l) === -1) {
        this.vlines.push(l);
      }
    }).bind(this));
  };

  GuideLines.prototype.removeVlines = function () {
    var index;
    Array.prototype.forEach.call(arguments, (function (l) {
      if (index = this.vlines.indexOf(l) !== -1) {
        this.vlines.splice(index, 1);
      }
    }).bind(this));
  };

  GuideLines.prototype.clearVlines = function () {
    this.vlines = [];
  };
  
  global.GuideLines = global.GuideLines || GuideLines;
  
})(window)
