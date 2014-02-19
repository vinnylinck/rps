/*global angular, console, confirm*/
angular.module("RPS").controller("homeController", ["$scope", "$http", function HomeController($scope, $http) {
    'use strict';
    var store = $scope.session.getObj('CUR_STORE');
    
    //
    if (!store) {
        $scope.goTo('/signin');
    } else {
        $scope.storeName = store.name;
    }
    
}]);