(function(window, doc) {
  var startPoint = { x: 0, y: 0 };
  var endPoint = { x: 0, y: 0 };

  var dragWraps = doc.querySelectorAll('.drag-wrap');
  var dragBlocks = doc.querySelectorAll('.drag-block');
  var dragTempBlock;

  function init() {
    var tempBlock = doc.createElement('div');
    tempBlock.className = 'temp-block';
    [].forEach.call(dragWraps, function(dragWrap) {
      dragWrap.appendChild(tempBlock.cloneNode(true));
    });
  }

  function getBlocksPosition() {
    var blocksPosition = [];
    var position;

    [].forEach.call(dragBlocks, function(dragBlock) {
      position = getOffsetToHtml(dragBlock);
      position.width = dragBlock.offsetWidth;
      position.height = dragBlock.offsetHeight;

      blocksPosition.push({
        element: dragBlock,
        position: position
      });
    });

    return blocksPosition;
  }

  function getOffsetToHtml(element) {
    var offset = { left: 0, top: 0};

    while(element) {
      offset.left += element.offsetLeft;
      offset.top += element.offsetTop;

      element = element.offsetParent;
    }

    return offset;
  }

  function getPointToHtml(point) {
    return {
      x: point.x + doc.body.scrollLeft,
      y: point.y + doc.body.scrollTop
    };
  }

  function isPointInRect(point, rect) {
    return point.x > rect.left && point.y > rect.top
      && point.x < (rect.left + rect.width) && point.y < (rect.top + rect.height);
  }

  function switchBlockPosition(aBlcok, bBlcok) {
    if(aBlcok.parentElement !== bBlcok.parentElement) {
      return;
    }

    var aBlockSibling = aBlcok.nextSibling;
    var bBlockSibling = bBlcok.nextSibling;

    if(aBlockSibling) {
      aBlcok.parentElement.insertBefore(bBlcok, aBlockSibling);
    } else {
      aBlcok.parentElement.appendChild(bBlcok);
    }

    if(bBlockSibling) {
      aBlcok.parentElement.insertBefore(aBlcok, bBlockSibling);
    } else {
      aBlcok.parentElement.appendChild(aBlcok);
    }
  }

  function appendTempBlock(block) {
    dragTempBlock.style.display = 'block';
    block.parentElement.insertBefore(dragTempBlock, block);
  }

  function removeTempBlock() {
    dragTempBlock.style.display = 'none';
  }

  var dragingBlockElement;

  init();

  [].forEach.call(dragBlocks, function(dragBlock) {
    dragBlock.addEventListener('mousedown', function(event) {
      dragingBlockElement = event.currentTarget;
      dragTempBlock = dragingBlockElement.parentElement.querySelectorAll('.temp-block')[0];

      dragingBlockElement.style.left = dragingBlockElement.offsetLeft + 'px';
      dragingBlockElement.style.top = dragingBlockElement.offsetTop + 'px';
      dragingBlockElement.style.position = 'absolute';
      dragingBlockElement.style.zIndex = 99;

      appendTempBlock(dragingBlockElement);

      startPoint.x = event.clientX;
      startPoint.y = event.clientY;
    });
  });

  doc.body.addEventListener('mousemove', function(event) {
    if(dragingBlockElement) {
      var endPointToHtml;
      var blocksPosition;

      endPoint.x = event.clientX;
      endPoint.y = event.clientY;

      dragingBlockElement.style.left = parseInt(dragingBlockElement.style.left) + endPoint.x - startPoint.x + 'px';
      dragingBlockElement.style.top = parseInt(dragingBlockElement.style.top) + endPoint.y - startPoint.y + 'px';

      startPoint.x = endPoint.x;
      startPoint.y = endPoint.y;

      endPointToHtml = getPointToHtml(endPoint);
      blocksPosition = getBlocksPosition();
      for(var i = blocksPosition.length - 1; i >= 0; i--) {
        if(blocksPosition[i].element !== dragingBlockElement && isPointInRect(endPointToHtml, blocksPosition[i].position)) {
          switchBlockPosition(blocksPosition[i].element, dragTempBlock);
          break;
        }
      }
    }
  });

  doc.body.addEventListener('mouseup', function(event) {
    if(dragingBlockElement) {
      dragingBlockElement.parentElement.insertBefore(dragingBlockElement, dragTempBlock);

      dragingBlockElement.style.left = 0;
      dragingBlockElement.style.top = 0;
      dragingBlockElement.style.position = 'relative';
      dragingBlockElement.style.zIndex = 1;
      dragingBlockElement = undefined;

      removeTempBlock();
    }
  });
})(window, document)
