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
    },
    TIMEOUT: {
      code: 1003,
      msg: '请1分钟后再请求'
    },
  },
  ARTICLE: {
    ILLEGAL_AUTHCODE: {
      code: 2000,
      msg: '授权码已过期，请重新获取'
    },
    ILLEGAL_USER: {
      code: 2001,
      msg: '无效的授权码'
    }
  },
  HOLE: {
    ERROR: {
      code: 3000,
      msg: '提交失败，请刷新页面'
    },
    EMPTY_CONTENT: {
      code: 3001,
      msg: '内容不能为空'
    },
    INVALID_SESSION: {
      code: 3002,
      msg: '页面已过期，请刷新页面'
    },
    TOO_FAST: {
      code: 3003,
      msg: '提交过于频繁，请稍等片刻'
    },
  },
  ERROR: 4001,
  UNKNOW: 4002,
  DB_ERROR: 5000,
};

var Ok = {
  code: 0,
  msg: ''
};

module.exports = {
  Ok: Ok,
  Error: Error
};