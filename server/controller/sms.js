'use strict';

var ALiDaYu = require('../../config.js').aLiDaYu;

var Tools = require('../util/tools.js');
var SmsVerify = require('../util/sms.js');
var SmsService = require('../service/sms.js');
var Request = require('../constant/request.js');

function sendAuthCode(req, res, next) {
  var num = req.body.phone;

  if(!SmsVerify.isPhone(num)) {
    res.json(Request.Error.SMS.EMPTY);
  } else if(!SmsVerify.isIllegal(num)) {
    res.json(Request.Error.SMS.ILLEGAL);
  } else {
    var authcode, now = Date.now(), diff;
    if(req.session.authcodetime && (diff = now - req.session.authcodetime) < 60 * 1000) {
      return res.json(Object.assign({}, Request.Error.SMS.TIMEOUT, {
        msg: '请' + (60 - Math.round(diff / 1000)) + '秒后再请求'
      }));
    }

    authcode = Tools.getAuthCode();

  	SmsService.sendAuthCode(num, authcode, function(err) {
  		if(err) {
  			return res.json(err);
  		}
  		
      req.session.authcode = authcode;
      req.session.authcodetime = now;
      res.cookie('authcode', 1, {
        expires: new Date(req.session.authcodetime + 1000 * 60 * 60), 
        httpOnly: true
      });

  		res.json(Request.Ok);
  	});
  }
}

module.exports = {
	sendAuthCode: sendAuthCode
};