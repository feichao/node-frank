/**
 * Created by frank on 16/5/29.
 */

'use strict';

var ALiDaYu = require('../../config.js').aLiDaYu;

var App = require('alidayu-node');
var DaYuApp = new App(ALiDaYu.appKey, ALiDaYu.appSecret);

function sendAuthCode(num, code, callback) {
  DaYuApp.smsSend({
    sms_free_sign_name: '短信验证码',
    sms_param: { "code": code },
    rec_num: num,
    sms_template_code: ALiDaYu.smsId
  }, function(data) {
    if (data.error_response) {
      callback({
      	code: data.error_response.code,
      	msg: data.error_response.sub_msg || data.error_response.msg
      });
    } else {
    	callback();
    }
  });
}

module.exports = {
  sendAuthCode: sendAuthCode
};
