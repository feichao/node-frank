(function () {
  'use strict';

  angular
    .module('ngTablePaging', ['fc.paging'])
    .directive('tablePaging', tablePaging);


  var TP_TYPE = {
    LOAD_MORE: 'load_more',
    LOAD_PRE_NEXT: 'load_pre_next',
    LOAD_PAGING: 'load_paging'
  };

  /**
   * @ngInject
   */
  function tablePaging($compile) {
    return {
      restrict: 'E',
      scope: {
        tpModel: '=',
        tpPagingModel: '=',
        tpType: '@',
        tpTotal: '=?',
        tpPagesize: '@',
        tpAsync: '&?',
      },
      template: [
        '<div>',
        ' <!-- table-paging content -->',
        ' <ng-transclude></ng-transclude>',
        ' <wan-material-paging ng-if="vm.tpType === vm.tpTypes.LOAD_PAGING" ng-show="vm.total > 1" wmp-total="vm.total" goto-page="vm.gotoPage()" ',
        '   position="center" current-page="vm.currentPage" step="8">',
        ' </wan-material-paging>',
        ' <div ng-if="vm.tpType === vm.tpTypes.LOAD_PRE_NEXT" layout="row" layout-align="center center" ng-show="!vm.isLoadingAlert">',
        '   <md-button class="md-primary md-raised" ng-click="vm.loadPre()" ng-disabled="vm.currentPage <= 1">',
        '     上一页',
        '   </md-button>',
        '   <span flex="5"></span>',
        '   <md-button class="md-primary md-raised mgr2" ng-click="vm.loadNext()" ng-disabled="vm.currentPage >= vm.total">',
        '     下一页',
        '   </md-button>',
        '   <span>当前第 {{ vm.currentPage }} 页</span>',
        ' </div>',
        ' <div ng-if="vm.tpType === vm.tpTypes.LOAD_MORE" ng-show="vm.currentPage < vm.total || vm.loadMoreComplete" ',
        '     layout="row" layout-align="center center">',
        '   <md-button class="md-primary md-raised" ng-click="vm.loadMore()">加载更多</md-button>',
        '   <span flex="5"></span>',
        '   <md-button class="md-raised" ng-click="vm.loadMoreAll()" ng-if="!vm.isAsync">加载全部</md-button>',
        ' </div>',
        '</div>'
      ].join(''),
      transclude: true,
      compile: tablePagingCompile($compile),
      controller: tablePagingCtrl,
      controllerAs: 'vm'
    };
  }

  /**
   * @ngInject
   */
  function tablePagingCompile($compile) {
    return function () {
      return function ($scope, $element) {

      };
    }
  }

  var DEFAULT_PAGESIZE = 20;

  /**
   * @ngInject
   */
  function tablePagingCtrl($scope) {
    var vm = this;

    // 是否需要异步加载数据
    vm.isAsync = angular.isFunction($scope.tpAsync);
    vm.tpTypes = TP_TYPE;
    vm.tpType = $scope.tpType || vm.tpTypes.LOAD_MORE;

    vm.pagesize = $scope.tpPagesize || DEFAULT_PAGESIZE;
    vm.total = 0;
    vm.currentPage = 1;

    if (vm.isAsync) {
      $scope.$watch('tpTotal', function () {
        vm.total = Math.ceil($scope.tpTotal / vm.pagesize);
      });

      $scope.$watch('tpModel', function (newModel, oldModel) {
        if (vm.tpType === vm.tpTypes.LOAD_MORE) {
          if (Array.isArray(newModel)) {
            $scope.tpPagingModel = newModel.concat($scope.tpPagingModel || []);
            if(newModel.length < vm.pagesize) {
              vm.loadMoreComplete = true;
            }
          }
        } else {
          $scope.tpPagingModel = newModel;
        }
      });
    } else { // 如果非异步，说明第一次拿到的行数据列表即是完整的数据
      $scope.$watch('tpModel', function () {
        if (Array.isArray($scope.tpModel)) {
          vm.total = Math.ceil($scope.tpModel.length / vm.pagesize);
          vm.gotoPage();
        }
      });
    }

    vm.gotoPage = function () {
      if (vm.isAsync) {
        $scope.tpAsync({
          currentPage: vm.currentPage
        });
      } else {
        if (Array.isArray($scope.tpModel)) {
          if (vm.tpType === vm.tpTypes.LOAD_MORE) {
            $scope.tpPagingModel = $scope.tpModel.filter(function (data, index) {
              return index < vm.currentPage * vm.pagesize;
            });
          } else {
            $scope.tpPagingModel = $scope.tpModel.filter(function (data, index) {
              return index > (vm.currentPage - 1) * vm.pagesize && index < vm.currentPage * vm.pagesize;
            });
          }
        }
      }
    };

    vm.loadMore = function() {
      vm.currentPage++;
      vm.gotoPage();
    };

    vm.loadMoreAll = function() {
      vm.currentPage = vm.total;
      vm.gotoPage();
    };

    vm.loadPre = function() {
      vm.currentPage--;
      vm.gotoPage();
    };

    vm.loadNext = function() {
      vm.currentPage++;
      vm.gotoPage();
    };
  }
})();
