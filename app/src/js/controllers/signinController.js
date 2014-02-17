/*global angular, alert, console*/
angular.module("RPS").controller("signinController", ["$scope", "$http", function SigninController($scope, $http) {
    'use strict';

    var doLogin, onSuccess, onError;

    $scope.isLoading = false;
    $scope.username = "";
    $scope.password = "";

    //
    onSuccess = function (data) {
        
        if (data.ok) {
            
            // saving user
            $scope.session.putObj("CUR_USER", data.result);
            
            // redirecting to store selection screen
            $scope.goTo('/stores');
            
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
        $http.post(uri, req).success(onSuccess).error(onError);
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