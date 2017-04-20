(function () {

    "use strict";

    angular.module("starter")
        .controller("L1FastViewController", L1FastViewCtrlFn);
    
    L1FastViewCtrlFn.$inject = ["L1FastViewServices", "$scope"];
    
    function L1FastViewCtrlFn(L1FastViewServices, $scope) {
        var self = this;
    }

})();