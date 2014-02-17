/*global angular, console, alert */
angular.module("RPS").controller("storesController", ["$scope", "$http", function ($scope, $http) {
    'use strict';

    // getting profile
    var curUsr = $scope.session.getObj('CUR_USER'),
        profileUri = $scope.config.url + 'profiles/' + curUsr.profile,

        //
        onError = function (err) {
            console.warn(err);
            alert(err);
        },
        
        //
        onSuccess = function (data) {
            if (data.ok) {
                console.log(data);
            } else {
                console.warn(data.error);
                alert(data.error.message);
                $scope.goTo('/signin');
            }
        };

    //
    $scope.name = curUsr.username;

    //
    $http.get(profileUri).success(onSuccess).error(onError);
}]);