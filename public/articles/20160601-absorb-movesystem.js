'use strict';

(function(global) {
  
  var _MoveSystem;
  
  var startPoint = {
    x: -1,
    y: -1,
  };
  
  var eleInfo;
  var isMoving;
  var ABD;
  var element;
  var eleBoundary;
  var guideLines;
  var alignLines;
  
  function MoveSystem(params) {
    
    if(_MoveSystem) {
      return _MoveSystem;
    }
    
    var md, mm, mp;
    
    function fun(params) {
      ABD = params && params.ABD || 5;
      element = params && params.element || undefined;
      guideLines = params && params.guideLines || undefined;
    
      document.addEventListener('mousedown', md = onMouseDown.bind(this));
      document.addEventListener('mousemove', mm = onMouseMove.bind(this));
      document.addEventListener('mouseup', mp = onMouseUp.bind(this));
    }
    
    fun.prototype.setABD = function(abd) {
      ABD = abd;
    };
    
    fun.prototype.setElement = function(ele) {
      element = ele;
      eleBoundary = {
        left: 0,
        top: 0,
        height: ele.offsetParent.offsetHeight,
        width: ele.offsetParent.offsetWidth
      };
    };
    
    fun.prototype.setGuideLines = function(gLines) {
      guideLines = gLines;
    };
    
    fun.prototype.setAlignLines = function(aLines) {
      alignLines = aLines;
    };
    
    fun.prototype.unbind = function(ele) {
      document.removeEventListener('mousedown', md);
      document.removeEventListener('mousemove', mm);
      document.removeEventListener('mouseup', mp);
    };
    
    return _MoveSystem = new fun(params);
  }
  
  function onMouseDown(event) {
    startPoint = {
      x: event.clientX,
      y: event.clientY
    };
    
    if(event.target === element) {
      isMoving = true;
      eleInfo = {
        left: element.offsetLeft,
        top: element.offsetTop,
        height: element.offsetHeight,
        width: element.offsetWidth,
      };
    }
  }
  
  function onMouseMove(event) {
    if(isMoving) {
      var ddx = event.clientX - startPoint.x;
      var ddy = event.clientY - startPoint.y;
      
      var abret = absorb(eleInfo, ddx, ddy);
      
      if(!abret.iabv) {
        startPoint.x = event.clientX;
      }
      
      if(!abret.iabh) {
        startPoint.y = event.clientY;
      }
      
      checkBoundary(eleInfo);
      
      element.style.left = eleInfo.left + 'px';
      element.style.top = eleInfo.top + 'px';
    }
  }
  
  function onMouseUp(event) {
    startPoint = {
      x: -1,
      y: -1
    };
    
    isMoving = false;
  }
  
  function absorb(eleInfo, xdd, ydd) {
    var t1; // 表示移动元素的左边界加上移动的距离：xdd可以为正数，也可以为负数，正数表示向右移动，负数表示向左移动
    var t2; // 表示移动元素的右边界加上移动的距离
    var tv; // 符合条件的垂直参考线，默认支取第一条进行吸附
    
    var iabv = true; // 在此次移动过程中是否在垂直参考线进行了吸附
    var iabh = true;
    
    var lr = null, tr = null, isAlign = false;
    
    if(xdd !== 0) {
      t1 = eleInfo.left + xdd;
      t2 = eleInfo.left + eleInfo.width + xdd;
      
      isAlign = false;
      
      if(alignLines && (alignLines.vlines instanceof Array)) {
        isAlign = false;
        lr = findAbsorbLine(alignLines.vlines, t1, t2);
      }
      
      if(guideLines && (guideLines.vlines instanceof Array) && !lr) {
        lr = findAbsorbLine(guideLines.vlines, t1, t2);
      }
      
      if(lr === null) {
        eleInfo.left = t1;
        iabv = false;
      } else {
        if(lr.i === 1) {
          if(eleInfo.left !== lr.l - eleInfo.width) {
            iabv = false;
            eleInfo.left = lr.l - eleInfo.width;
          }
        } else {
          if(eleInfo.left !== lr.l) {
            iabv = false;
            eleInfo.left = lr.l;
          }
        }
      }
    }
    
    if(ydd !== 0) {
      t1 = eleInfo.top + ydd;
      t2 = eleInfo.top + eleInfo.height + ydd;
      
      if(alignLines && (alignLines.hlines instanceof Array)) {
        tr = findAbsorbLine(alignLines.hlines, t1, t2);
      }
      
      if(guideLines && (guideLines.hlines instanceof Array) && !tr) {
        tr = findAbsorbLine(guideLines.hlines, t1, t2);
      }
      
      if(tr === null) {
        eleInfo.top = t1;
        iabh = false;
      } else {
        if(tr.i === 1) {
          if(eleInfo.top !== tr.l - eleInfo.height) {
            iabh = false;
            eleInfo.top = tr.l - eleInfo.height;
          }
        } else {
          if(eleInfo.top !== tr.l) {
            iabh = false;
            eleInfo.top = tr.l;
          }
        }
      }
    }
    
    return {
      iabv: iabv,
      iabh: iabh
    };
  }

  function findAbsorbLine(abls) {
    var tls = Array.prototype.slice.call(arguments, 1);
    
    var length = tls.length;
    var aba = [];
    
    for(var i = 0; i < length; i++) {
      aba = abls.filter(function(a) {
        return Math.abs(a - tls[i]) < ABD;
      });
      
      if(aba.length > 0) {
        return {
          l: aba[0],
          i: i
        };
      }
    }
    
    return null;
  }
  
  function checkBoundary(eleInfo) {
    if(eleInfo.left < eleBoundary.left) {
      eleInfo.left = eleBoundary.left;
    }
    
    if(eleInfo.top < eleBoundary.top) {
      eleInfo.top = eleBoundary.top;
    }
    
    if(eleInfo.left + eleInfo.width > eleBoundary.left + eleBoundary.width) {
      eleInfo.left = eleBoundary.left + eleBoundary.width - eleInfo.width;
    }
    
    if(eleInfo.top + eleInfo.height > eleBoundary.top + eleBoundary.height) {
      eleInfo.top = eleBoundary.top + eleBoundary.height - eleInfo.height;
    }
  }
  
  global.MoveSystem = global.MoveSystem || MoveSystem;
  
})(window)