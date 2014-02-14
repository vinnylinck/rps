/*global angular, console, confirm*/
angular.module("RPS").controller("splashController", ["$scope", "$timeout", "$http", function SplashController($scope, $timeout, $http) {
    'use strict';

    //
    var start, connect, onConnect, onRefuse;


    //
    onConnect = function onSuccess(result) {

        if (result.ok) {
            $scope.isLoadBarVisible = false;
            $scope.goTo("/signin");
        } else {
            onRefuse('Server offline.');
        }
    };

    //
    onRefuse = function onError(err) {
        console.warn(err);

        if (confirm("Woops! It seems you are not connected to the internet. Do you want a second chance?")) {
            connect();
        } else {
            $scope.isLoadBarVisible = false;
        }
    };

    //
    connect = function connect() {
        $scope.isLoadBarVisible = true;
        $http.get($scope.config.url).success(onConnect).error(onRefuse);
    };

    //
    start = function appInit() {
        $scope.isLogoVisible = true;
        $scope.enableAnimate();
        connect();
    };


    // preparing for launch
    $scope.isLogoVisible = false;
    $scope.isLoadBarVisible = false;

    // showing logo
    $timeout(start, 30);
}]);