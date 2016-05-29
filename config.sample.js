'use strict';

module.exports = {
	// connect you mongodb to store your data
	mongoose: {
		url: 'mongodb://localhost/xxxx',
	},

	// use to send sms when people post a blog: http://www.alidayu.com/
  aLiDaYu: {
    appKey: 'xxxxx',
    appSecret: 'xxxx',
    smsId: 'xxxx',
    // the white list to post a blog
    phoneList: ['1360000000']
  },

  // home page's title list, random show
  titles: ['美好的一天', '这不是游戏', '用心爱她', '最初的故事', '谁拿走了龙珠'],

  // all the pages
  pages: [{
  	link: '/',
  	text: '主页邬'
  }, {
  	link: '/article',
  	text: '猿文色'
  }, {
  	link: '/story',
  	text: '故事旮'
  }, {
  	link: '/about',
  	text: '关于の'
  }],

  connects: [{
  	title: 'Follow me',
  	icon: 'fa-facebook',
  	link: 'https://github.com/feichao',
  }, {
  	title: 'Follow me',
  	icon: 'fa-github',
  	link: 'https://github.com/feichao',
  }, {
  	title: 'Follow me',
  	icon: 'fa-linkedin',
  	link: 'https://github.com/feichao',
  }, {
  	title: 'Follow me',
  	icon: 'fa-weibo',
  	link: 'https://github.com/feichao',
  }, {
  	title: 'Follow me',
  	icon: 'fa-weixin',
  	link: 'https://github.com/feichao',
  }]

};