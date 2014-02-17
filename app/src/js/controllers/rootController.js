/*global angular*/
angular.module("RPS").controller("rootController", ["$rootScope", "$scope", "$location", "$timeout", "rps.config", "storageFactory", function RootController($rootScope, $scope, $location, $timeout, rpsConfig, storageFactory) {
    'use strict';
    
    $scope.isLayoutAnimated = false;
    
    $rootScope.config = rpsConfig;
    
    $rootScope.goTo = function goTo(uri) {
        
        $timeout(function goToLocation() {
            $location.path(uri);
        }, 0);
        
    };
    
    $rootScope.enableAnimate = function rootEnableAnimate() {
        $scope.isLayoutAnimated = true;
    };
    
    $rootScope.disableAnimate = function rootDisableAnimate() {
        $scope.isLayoutAnimated = false;
    };
    
    //
    $rootScope.session = storageFactory('sessionStorage');
    $rootScope.storage = storageFactory('localStorage');
}]);