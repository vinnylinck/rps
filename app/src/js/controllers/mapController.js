/*global angular, console, confirm*/
angular.module("RPS").controller("mapController", ["$scope", "$routeParams", function HomeController($scope, $routeParams) {
    'use strict';
    
    $scope.label = $routeParams.label;
    $scope.lat = $routeParams.lat;
    $scope.lon = $routeParams.lon;
    
}]);