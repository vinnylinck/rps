/*global angular, window*/
(function AngularBootstrap() {
    'use strict';
    
    // creating module
    var app = angular.module("RPS", ["ngRoute", "ngAnimate", "ngTouch"]);
    
    // setting constants
    app.constant(
        "rps.config",
        {
            url: "http://rio-tst.herokuapp.com/"
        }
    );
    
    // config time
    app.config(["$routeProvider", function AppConfig($routeProvider) {
        $routeProvider.when("/splash", { templateUrl: "partials/splash.html", controller: "splashController"});
        $routeProvider.when("/signin", { templateUrl: "partials/signin.html", controller: "signinController"});
        $routeProvider.when("/stores", { templateUrl: "partials/stores.html", controller: "storesController"});
        
        $routeProvider.otherwise({ redirectTo: "/splash" });
    }]);
    
    
    // run time
    app.run(["$route", "$http", "$templateCache", function AppRun($route, $http, $templateCache) {
        
        // caching templates
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, { cache: $templateCache });
            }
        });
        
        
        // fixing orientation on FFOS
        if (window.screen.mozLockOrientation !== undefined) {
            window.screen.mozLockOrientation("portrait");
        }
    }]);
}());