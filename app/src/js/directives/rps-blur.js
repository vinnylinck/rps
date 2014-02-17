/*global angular */
angular.module("RPS").directive("rpsBlur", function () {
  
    /*
    */
    return function (scope, element, attrs) {
        
        var doBlur = function doElmBlur() {
            element[0].blur();
        };
        
        scope.$on("RPS_BLUR_ALL", doBlur);
    };
    
});