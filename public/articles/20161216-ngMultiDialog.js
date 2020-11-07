(function() {
  'use strict';

  angular
    .module('ngMultiDialog', [])
    .directive('ngMultiDialog', ngMultiDialog);

  function ngMultiDialog() {
    return {
      restrict: 'EA',
      scope: {
        open: '=', // whether a dialog is open
        ev: '=' // event that trigger open dialog
      },
      template: '<div style="display:none;"><div class="ng-multi-dialog-content" ng-transclude></div></div>',
      transclude: true,
      link: ngMultiDialogPostLink,
      controller: ngMultiDialogCtrl,
      controllerAs: 'vm'
    };

    function ngMultiDialogPostLink($scope, element, attr) {
      var containerId = 'ng-multi-dialog-container-' + Math.round(Date.now() + Math.random() * 10000000000);
      var wrapElement;
      var contentElement;

      $scope.appendContent = function() {
        if($scope.isOpeningOrClosing) {
          return;
        }

        $scope.isOpeningOrClosing = true;

        var wrapElement = document.getElementById(containerId);
        contentElement = element.find('div')[1];

        if (!wrapElement) {
          wrapElement = document.createElement('div');
          wrapElement.id = containerId;
          wrapElement.className = 'ng-multi-dialog-container';
          document.body.appendChild(wrapElement);
        }

        wrapElement.appendChild(contentElement);

        return angular.element(wrapElement);
      };

      $scope.recoveryContent = function() {
        if($scope.isOpeningOrClosing) {
          return;
        }

        $scope.isOpeningOrClosing = true;

        element.find('div').append(contentElement);
        return angular.element(wrapElement);
      };
    }

    function ngMultiDialogCtrl($scope, $timeout) {
      var vm = this;
      var wrapElement;

      $scope.$watch('open', function() {
        console.log($scope.open);
        if ($scope.open) {
          showContent();
        } else {
          hideContent();
        }
      });

      function showContent() {
        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        var width;
        var height;

        var transformLeft;
        var transformTop;

        var contentElement;
        var contentDomElement;

        wrapElement = $scope.appendContent().addClass('show-container show-container-bg');
        contentElement = wrapElement.children();
        contentDomElement = contentElement[0];
        width = contentDomElement.offsetWidth;
        height = contentDomElement.offsetHeight;

        transformLeft = (viewportWidth - width) / 2;
        transformTop = (viewportHeight - height) / 2;

        $timeout(function() {
          if($scope.ev) {
            contentElement.css('transformOrigin', ($scope.ev.clientX - transformLeft) + 'px ' + ($scope.ev.clientY - transformTop) + 'px');
          }
          contentElement.addClass('show-content');

          $scope.isOpeningOrClosing = false;
        }, 0);
      };

      function hideContent() {
        if (wrapElement) {
          wrapElement.removeClass('show-container-bg').children().removeClass('show-content');
          $timeout(function() {
            wrapElement.removeClass('show-container');
            $scope.recoveryContent();

            $scope.isOpeningOrClosing = false;
          }, 400);
        }
      };
    }
  }

})();
