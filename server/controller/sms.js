'use strict';

var ALiDaYu = require('../../config.js').aLiDaYu;

var SmsVerify = require('../util/sms.js');
var SmsService = require('../service/sms.js');
var Request = require('../constant/request.js');

function sendSmsNum(req, res, next) {
  var num = req.body.phone;

  if(!SmsVerify.isPhone(num)) {
    res.json(Request.Error.SMS.EMPTY);
  } else if(!SmsVerify.isIllegal(num)) {
    res.json(Request.Error.SMS.ILLEGAL);
  } else {
  	SmsService.sendAuthCode(num);
    res.json(Request.Ok);
  }
}