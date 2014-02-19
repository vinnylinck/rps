/*global angular, console, alert */
angular.module("RPS").controller("storesController", ["$scope", "$http", function ($scope, $http) {
    'use strict';

    // getting profile
    var curUsr = $scope.session.getObj('CUR_USER'),
        profileUri = $scope.config.url + 'profiles/' + curUsr.profile,
        workStoreUri = $scope.config.url + 'users/session/store/',

        //
        onError = function (err) {
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
        onWorkStoreSuccess = function (data) {
            if (data.ok) {
                $scope.goTo('/home');
            } else {
                console.warn(data.error);
                alert(data.error.message);
            }
        };
    

    //
    $scope.selectStore = function (store) {
        
        // no categories, no donuts
        if (store.categories.length) {
            alert('This store can be chosen because there is no category associated to it.');
        } else {
            $http.put(workStoreUri + store._id).success(onWorkStoreSuccess).error(onError);
        }

    };

    //
    $scope.name = curUsr.username;
    $scope.userStores = [];

    //
    $http.get(profileUri).success(onLoadProfileSuccess).error(onError);
}]);