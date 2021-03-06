/*global angular, alert, console*/
angular.module("RPS").controller("signinController", ["$scope", "$http", "$rootScope", function SigninController($scope, $http, $rootScope) {
    'use strict';

    var doLogin, onLoginSuccess, doLoadProfile, onLoadProfileSucess, onError;

    $scope.isLoading = false;
    $scope.username = $scope.storage.get("LAST_USER") || "";
    $scope.password = "";


    // on load profile success
    onLoadProfileSucess = function (data) {
        if (data.ok) {
            $scope.session.putObj('CUR_PROFILE', data.result);
            $scope.goTo('/stores');
        } else {
            console.warn(data.error);
            alert(data.error.message);
            $scope.isLoading = false;
        }        
    };


    // doLoadProfile
    doLoadProfile = function (user){
        if (!user.profile) {
            alert('No profile is assigned to ' + user.username);
            $scope.isLoading = false;
        } else {
            $http.get($scope.config.url + 'profiles/' + user.profile).success(onLoadProfileSucess).error(onError);
        }
    };


    //
    onLoginSuccess = function (data) {
        // preparing for profile loading
        var uri;


        // if everything is ok...
        if (data.ok) {

            // remember: no support for admin accounts
            if (data.result.admin) {
                alert('Sorry... no support for admin accounts yet.');
                $scope.isLoading = false;
            } else {
                // saving user
                $scope.session.putObj("CUR_USER", data.result);
                $scope.storage.put("LAST_USER", data.result.username);

                // loading profile
                doLoadProfile(data.result);
            }

            // if facing issues...    
        } else {
            // internal failure during log-in?
            alert(data.result.error.message);
            $scope.isLoading = false;
        }    
    };

    //
    onError = function (err) {
        console.warn(err);
        alert(err);
        $scope.isLoading = false;
    };

    //
    doLogin = function (usr, pwd) {
        var uri = $scope.config.url + 'users/session',
            req = {
                "username": usr,
                "password": pwd
            };

        $scope.isLoading = true;
        $scope.$broadcast("RPS_BLUR_ALL");

        $http.post(uri, req).success(onLoginSuccess).error(onError);
    };

    //
    $scope.signIn = function () {
        if ($scope.username.length === 0 || $scope.password.length === 0) {
            alert('Username and password cannot be blank!');
        } else {
            doLogin($scope.username, $scope.password);
        }
    };
}]);