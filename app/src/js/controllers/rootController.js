/*global angular*/
angular.module("RPS").controller("rootController", ["$rootScope", "$scope", "$location", "$timeout", "rps.config", "storageFactory", "$window", function RootController($rootScope, $scope, $location, $timeout, rpsConfig, storageFactory, $window) {
    'use strict';

    $scope.isLayoutAnimated = false;
    $scope.isHeaderBackAllowed = false;
    $scope.headerClass = 'full';

    //
    $rootScope.config = rpsConfig;

    //
    $scope.goBack = function () {
        $window.history.back();
    };

    //
    $rootScope.goTo = function goTo(uri) {

        $timeout(function goToLocation() {
            $location.path(uri);
        }, 0);

    };

    //
    $rootScope.enableAnimate = function rootEnableAnimate() {
        $scope.isLayoutAnimated = true;
    };

    //
    $rootScope.disableAnimate = function rootDisableAnimate() {
        $scope.isLayoutAnimated = false;
    };

    //
    $rootScope.enableHeaderBack = function rootEnableHeader() {
        $scope.isHeaderBackAllowed = true;
        $scope.headerClass = 'half';
    };

    //
    $rootScope.disableHeaderBack = function rootDisableHeader() {
        $scope.isHeaderBackAllowed = false;
        $scope.headerClass = 'full';
    };


    //
    $rootScope.session = storageFactory('sessionStorage');
    $rootScope.storage = storageFactory('localStorage');
}]);
