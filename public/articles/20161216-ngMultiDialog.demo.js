angular.module('App', ['ngMaterial', 'ngMultiDialog'])
  .controller('Controller', function($scope) {
    $scope.openWrapperDialog = function(event) {
      $scope.isWrapperDialogOpen = true;
      $scope.openWrapperDialogEvent = event;
    };

    $scope.closeWrapperDialog = function(event) {
      $scope.isWrapperDialogOpen = false;
    };

    $scope.openInnerDialog = function(event) {
      $scope.isInnerDialogOpen = true;
      $scope.openInnerDialogEvent = event;
    };

    $scope.closeInnerDialog = function(event) {
      $scope.isInnerDialogOpen = false;
    };
  });
