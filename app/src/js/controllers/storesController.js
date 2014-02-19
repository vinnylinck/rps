/*global angular, console, alert */
angular.module("RPS").controller("storesController", ["$scope", "$http", function ($scope, $http) {
    'use strict';

    // getting profile
    var curUsr = $scope.session.getObj('CUR_USER'),
        profileUri = $scope.config.url + 'profiles/' + curUsr.profile,

        //
        onLoadProfileError = function (err) {
            console.warn(err);
            alert(err);
        },
        
        //
        onLoadProfileSuccess = function (data) {
            if (data.ok) {
                $scope.userStores = data.result.stores;
            } else {
                console.warn(data.error);
                alert(data.error.message);
                $scope.goTo('/signin');
            }
        },
        
        //
        selectStore = function (id) {
            $http.
        };

    //
    $scope.name = curUsr.username;
    $scope.userStores = [];

    //
    $http.get(profileUri).success(onLoadProfileSuccess).error(onLoadProfileError);
}]);