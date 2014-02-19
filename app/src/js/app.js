/*global angular, window*/
(function AngularBootstrap() {
    'use strict';
    
    // creating module
    var app = angular.module("RPS", ["ngRoute", "ngAnimate", "ngTouch", "pasvaz.bindonce"]);
    
    // setting constants
    app.constant(
        "rps.config",
        {
            url: "http://rio-tst.herokuapp.com/"
            //url: "http://localhost:9000/"
        }
    );
    
    // config time
    app.config(["$routeProvider", "$httpProvider", function AppConfig($routeProvider, $httpProvider) {
        
        //
        $routeProvider.when("/splash", { templateUrl: "partials/splash.html", controller: "splashController"});
        $routeProvider.when("/signin", { templateUrl: "partials/signin.html", controller: "signinController"});
        $routeProvider.when("/stores", { templateUrl: "partials/stores.html", controller: "storesController"});
        $routeProvider.when("/home", { templateUrl: "partials/home.html", controller: "homeController"});
        
        $routeProvider.otherwise({ redirectTo: "/splash" });
        
        //
        $httpProvider.defaults.withCredentials = true;
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