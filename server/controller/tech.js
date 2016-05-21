'use strict';

var marked = require('marked');

function renderTech(req, res, next) {
	var content = marked('# Marked in browser\n\nRendered by **marked**.');

	res.render('tech', { title: 'Tech', content: content });
}

module.exports = {
	renderTech: renderTech
}