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

    var authcode = Tools.getAuthCode();

  	SmsService.sendAuthCode(num, authcode, function(err) {
  		if(err) {
  			return res.json(err);
  		}
  		
      req.session.authcode = authcode;
      res.cookie('authcode', 1, {
        expires: new Date(Date.now() + 1000 * 60 * 60), 
        httpOnly: true
      });

  		res.json(Request.Ok)
  	});
  }
}

module.exports = {
	sendAuthCode: sendAuthCode
};