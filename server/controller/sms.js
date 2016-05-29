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
  	SmsService.sendAuthCode(num, Tools.getAuthCode(), function(err) {
  		if(err) {
  			return res.json(err);
  		}
  		
  		res.json(Request.oK)
  	});
  }
}

module.exports = {
	sendAuthCode: sendAuthCode
};