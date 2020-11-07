
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var MM = 40;

context.save();

for (var i = 0; i < 800; i += MM) {
  for (var j = 0; j < 400; j += MM) {
    if ((i + j) / MM % 2 === 0) {
      context.fillStyle = 'rgba(230, 230, 230, 0.5)';
    } else {
      context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    }
    context.fillRect(i, j, MM, MM);
  }
}

context.restore();

var guideLines = new GuideLines();

for (var i = 0; i <= 400; i += MM) {
  guideLines.addHlines(i);
}

for (var j = 0; j <= 800; j += MM) {
  guideLines.addVlines(j);
}

var content = document.getElementById('content');
var retangles = document.getElementsByClassName('retangle');

var alignLines = new GuideLines();

content.addEventListener('mousedown', function(event) {
  if(/retangle/.test(event.target.id)) {
    moveSystem.setElement(event.target);
  }
  
  alignLines.clearHlines();
  alignLines.clearVlines();
  
  Array.prototype.forEach.call(retangles, function(r) {
    if(r !== event.target) {
      alignLines.addHlines(r.offsetTop, r.offsetTop + r.offsetHeight);
      alignLines.addVlines(r.offsetLeft, r.offsetLeft + r.offsetWidth);
    }
  });
});

var moveSystem = new MoveSystem();

moveSystem.setABD(5);
moveSystem.setGuideLines(guideLines);
moveSystem.setAlignLines(alignLines);