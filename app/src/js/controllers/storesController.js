/*global angular, console, alert */
angular.module("RPS").controller("storesController", ["$scope", "$http", function ($scope, $http) {
    'use strict';

    // getting profile
    var workStoreUri = $scope.config.url + 'users/session/store/',
        curProf = $scope.session.getObj('CUR_PROFILE'),

        //
        onError = function (err) {
            console.warn(err);
            alert(err);
            $scope.isLoading = false;
        },

        //
        onWorkStoreSuccess = function (data) {
            if (data.ok) {
                $scope.goTo('/home');
            } else {
                console.warn(data.error);
                alert(data.error.message);
                $scope.isLoading = false;
            }
        };


    //
    $scope.selectStore = function (store) {

        // no categories, no donuts
        if (store.categories.length) {
            alert('This store can be chosen because there is no category associated to it.');
        } else if (!$scope.isLoading) {
            $scope.isLoading = true;
            $scope.session.putObj('CUR_STORE', store);
            $http.put(workStoreUri + store._id).success(onWorkStoreSuccess).error(onError);
        }

    };

    //
    if (!curProf) {
        $scope.session.clear();
        $scope.storage.clear();
        $scope.goTo('/signin');
    } else {
        //
        $scope.isLoading = false;
        $scope.name = $scope.storage.get('LAST_USER') || '';
        $scope.userStores = curProf.stores;
    }

}]);