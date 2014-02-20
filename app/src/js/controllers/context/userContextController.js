/*global angular, console, alert*/
angular.module("RPS").controller("userContextController", ["$scope", "$http", function UserContextController($scope, $http) {
    'use strict';
    var meUri = $scope.config.url + 'users/me',
        soUri = $scope.config.url + 'users/session',

        //
        onError = function (err) {
            console.warn(err);
            alert('Network error when retrieving user data.');
        },

        //
        onSuccess = function (data) {

            if (!data.ok) {
                onError(data);
            } else if (!data.result._id) {
                $scope.signOut();
            } else {
                console.log(data.result);
            }


        },

        //
        onLogoff = function (data) {
            
            if (!data.ok) {
                console.warn(data);
                alert('Unexpected error during sign off process. Alltemporary data will be erased.');
                $scope.storage.clear();
            }
            
            $scope.session.clear();
            $scope.goTo('/signin');
        };

    // loggin out
    $scope.signOut = function () {
        $http.delete(soUri).success(onLogoff).error(onError);
    };

    // Refresh user data
    $scope.refresh = function () {
        $http.get(meUri).success(onSuccess).error(onError);
    };

    // initializing user refresh info
    $scope.refresh();
}]);