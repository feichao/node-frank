/**
 * Created by frank on 16/5/29.
 */

var Error = {
  SMS: {
    EMPTY: {
      code: 1000,
      msg: '请输入正确的手机号码'
    },
    ILLEGAL: {
      code: 1001,
      msg: '此手机号码未授权'
    }
  }
};

var Ok = {
  code: 0,
  msg: ''
};

module.exports = {
  Ok: Ok,
  Error: Error
};