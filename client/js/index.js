'use strict';

var indexPage;
var tabList;
var articleList;

$(document).ready(function() {
  indexPage = $('#index-page-wrap');
  tabList = indexPage.find('.shortcut-articles > ul > li');
  articleList = indexPage.find('.articles-list');

  tabList.on('click', showArticle);

});

function showArticle(event) {
  var $this = $(this);
  var index = tabList.index($this);

  tabList.removeClass('active');
  $this.addClass('active');

  articleList.removeClass(function(index, css) {
    return (css.match(/(^|\s)trans-\S+/g) || []).join(' ');
  }).addClass('trans-' + index);

}
