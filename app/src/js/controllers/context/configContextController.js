/*global angular, console, alert*/
angular.module("RPS").controller("configContextController", ["$scope", function UserContextController($scope) {
    'use strict';
    
    //
    $scope.changeStore = function () {
        $scope.enableAnimate();
        $scope.enableHeaderBack();
        $scope.goTo('/stores');
    };
    
    
}]);