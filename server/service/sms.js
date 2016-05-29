/**
 * Created by frank on 16/5/29.
 */

'use strict';

var ALiDaYu = require('../../config.js').aLiDaYu;

var App = require('alidayu-node');
var DaYuApp = new App(ALiDaYu.appKey, ALiDaYu.appSecret);

function sendAuthCode(num, code) {
  DaYuApp.smsSend({
    sms_free_sign_name: '短信验证码',
    sms_param: { "code": code },
    rec_num: num,
    sms_template_code: ALiDaYu.smsId
  });
}

module.exports = {
  sendAuthCode: sendAuthCode
};

