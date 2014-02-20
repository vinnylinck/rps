/*global angular, console, confirm*/
angular.module("RPS").controller("homeController", ["$scope", "$http", function HomeController($scope, $http) {
    'use strict';
    var store = $scope.session.getObj('CUR_STORE'),
        last_tpl = $scope.session.get('LAST_CTX') || 0;
    
    // validating data
    if (!store) {
        $scope.goTo('/signin');
    } else {
        $scope.storeName = store.name;
    }

    // defining contexts
    $scope.contexts = [
        { key: 'TPL_CAT', tpl: 'partials/templates/categories.html', icon: 'fa-star' },
        { key: 'TPL_SRC', tpl: 'partials/templates/search.html',     icon: 'fa-search' },
        { key: 'TPL_USR', tpl: 'partials/templates/user.html',       icon: 'fa-user' },
        { key: 'TPL_CFG', tpl: 'partials/templates/config.html',     icon: 'fa-gear' },
        { key: 'TPL_INF', tpl: 'partials/templates/info.html',       icon: 'fa-info-circle' }
    ];
    
    // load new context
    $scope.loadContext = function (idx) {
        $scope.session.put('LAST_CTX', idx);
        $scope.sandbox = $scope.contexts[idx];
    };
    

    
    // start first context
    $scope.sandbox = $scope.contexts[last_tpl];

    // disabling animate
    $scope.disableAnimate();
}]);