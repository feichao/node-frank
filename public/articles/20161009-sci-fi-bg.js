var SQRT3 = +(Math.sqrt(3) / 2).toFixed(3);

var width = document.body.offsetWidth;
var height = document.body.offsetHeight;

var canvas = document.getElementById('canvas');
canvas.height = height;
canvas.width = width;

var ctx = canvas.getContext('2d');
ctx.lineWidth = 6;

var centerX = width / 2;
var centerY = height / 2;
var radio = 36;

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var SexAngle = {
    spreadAngles: [],
    draw: function(options) {
        return this._drawCenter(options);
    },
    _drawCenter: function(opt) {
        var startX = +(opt.centerX - opt.radio / 2).toFixed(3);
        var startY = +(opt.centerY - opt.radio * SQRT3).toFixed(3);
        var centerX = +(opt.centerX).toFixed(3);
        var centerY = +(opt.centerY).toFixed(3);
        var radio = +(opt.radio).toFixed(3);

        ctx.save();

        ctx.strokeStyle = 'rgba(0, 0, 128, ' + 1 + ')';

        // ctx.transform(Math.random(), 0, 0, Math.random(), 0, 0);

        ctx.beginPath();

        ctx.moveTo(startX, startY);
        ctx.lineTo(startX + radio, startY);
        ctx.lineTo(centerX + radio, centerY);
        ctx.lineTo(startX + radio, +(startY + radio * SQRT3 * 2).toFixed(3));
        ctx.lineTo(startX, +(startY + radio * SQRT3 * 2).toFixed(3));
        ctx.lineTo(centerX - radio, centerY);
        ctx.closePath();

        ctx.stroke();

        ctx.restore();

        return {
            centerX: centerX,
            centerY: centerY,
            radio: radio
        };
    },
    _angleA: function(opt) {
        return {
            centerX: opt.centerX,
            centerY: opt.centerY - opt.radio * SQRT3 * 2,
            radio: radio
        };
    },
    _angleB: function(opt) {
        return {
            centerX: opt.centerX + opt.radio * 1.5,
            centerY: opt.centerY - opt.radio * SQRT3,
            radio: radio
        };
    },
    _angleC: function(opt) {
        return {
            centerX: opt.centerX + opt.radio * 1.5,
            centerY: opt.centerY + opt.radio * SQRT3,
            radio: radio
        };
    },
    _angleD: function(opt) {
        return {
            centerX: opt.centerX,
            centerY: opt.centerY + opt.radio * SQRT3 * 2,
            radio: radio
        };
    },
    _angleE: function(opt) {
        return {
            centerX: opt.centerX - opt.radio * 1.5,
            centerY: opt.centerY + opt.radio * SQRT3,
            radio: radio
        };
    },
    _angleF: function(opt) {
        return {
            centerX: opt.centerX - opt.radio * 1.5,
            centerY: opt.centerY - opt.radio * SQRT3,
            radio: radio
        };
    },
    _isAngleIn: function(curIndex, angle, viewport) {
        if (!(angle.centerX > 0 && angle.centerX < viewport.width && angle.centerY > 0 && angle.centerY < viewport.height)) {
            return true;
        }

        var equalAngle = function(agl) {
            return Math.abs(agl.centerX - angle.centerX) < 0.1 && Math.abs(agl.centerY - angle.centerY) < 0.1;
        };

        return (Array.isArray(this.spreadAngles[curIndex]) && this.spreadAngles[curIndex].filter(equalAngle).length > 0) || (Array.isArray(this.spreadAngles[curIndex - 1]) && this.spreadAngles[curIndex - 1].filter(equalAngle).length > 0) || (Array.isArray(this.spreadAngles[curIndex - 2]) && this.spreadAngles[curIndex - 2].filter(equalAngle).length > 0);
    },
    spread: function(options, viewportOptions) {
        var index = 0;

        this.spreadAngles = [];

        this.spreadAngles[0] = [{
            centerX: centerX,
            centerY: centerY,
            radio: radio
        }];

        // ctx.clearRect(0, 0, viewportOptions.width, viewportOptions.height);

        var tempOpt = {};

        while (true) {
            index++;
            this.spreadAngles[index] = [];

            for (var i = 0; i < this.spreadAngles[index - 1].length; i++) {
                var angle = this.spreadAngles[index - 1][i];
                tempOpt = this._angleA(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }

                tempOpt = this._angleB(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }

                tempOpt = this._angleC(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }

                tempOpt = this._angleD(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }

                tempOpt = this._angleE(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }

                tempOpt = this._angleF(angle);
                if (!this._isAngleIn(index, tempOpt, viewportOptions)) {
                    this.spreadAngles[index].push(tempOpt);
                    this._drawCenter(tempOpt);
                }
            }

            if (this.spreadAngles[index].length <= 0) {
                this.spreadAngles.pop();

                // requestAnimFrame(function() {
                // 	SexAngle.spread(options, viewportOptions)
                // });

                return;
            }
        }
    }
};

var viewportOption = {
    height: height,
    width: width
};

var opt = SexAngle.draw({
    centerX: centerX,
    centerY: centerY,
    radio: radio
});

// requestAnimFrame(function() {
SexAngle.spread(opt, viewportOption)
    // });
