/*global angular, yepnope, google, navigator*/
angular.module("RPS").directive("gmap", ['$window', '$q', function ($window, $q) {
    'use strict';

    var prom,

        //
        hasGMap = function () {

            return (($window.google && $window.google.maps) || false);
        },

        //
        loadMaps = function () {
            $window.google.load("maps", "3", {
                callback: function () {

                    if (hasGMap()) {
                        prom.resolve();
                    } else {
                        prom.reject();
                    }

                },
                other_params: "sensor=true&language=en"
            });
        },

        //
        lazyLoad = function () {
            prom = $q.defer();

            yepnope({
                load: "js!http://www.google.com/jsapi",
                callback: loadMaps
            });


            return prom.promise;
        },

        //
        showPosition = function (map, label, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: label,
                icon: "img/rice_0.png"
            });

            map.setCenter(location);
        },

        //
        setPin = function (raw, label, lat, lon) {
            navigator.geolocation.getCurrentPosition( function (position) {
                var startPoint = new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    storePoint = new google.maps.LatLng(lat, lon),

                    options =  {
                        center: startPoint,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                var map = new google.maps.Map(raw, options);

                showPosition(map, label, startPoint);                 
            });
        };




    return function (scope, elm, attrs) {
        //
        scope.isLoading = true;


        //
        attrs.$observe('gmap', function (label) {
            if (hasGMap()) {
                setPin(attrs.gmap, attrs.lat, attrs.lon);
            } else {
                lazyLoad().then(
                    function () {
                        scope.isLoading=false;
                        setPin(elm[0], attrs.gmap, attrs.lat, attrs.lon);
                    },

                    function () {
                        scope.isLoading = false;
                        $window.alert('No donuts for you!');
                    }
                );
            }
        });

        /*
        var map, options, showPosition, pin, store,
            iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        pin = function (label, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: label
            });

            map.setCenter(location);
        };

        store = function (label, location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                title: label,
                icon: "/img/rice_0.png"
            });
        };

        navigator.geolocation.getCurrentPosition(showPosition);
        */
    };
}]);