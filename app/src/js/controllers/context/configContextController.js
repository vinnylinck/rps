/*global angular, console, alert*/
angular.module("RPS").controller("configContextController", ["$scope", function UserContextController($scope) {
    'use strict';
    
    //
    $scope.changeStore = function () {
        $scope.enableAnimate();
        $scope.enableHeaderBack();
        $scope.goTo('/stores');
    };
    
    //
    $scope.showMap = function () {
        var store = $scope.session.getObj('CUR_STORE');
        
        $scope.enableAnimate();
        $scope.goTo('/map/' + store.name + '/' + store.coords.lat + '/' + store.coords.lon);
    };
    
}]);