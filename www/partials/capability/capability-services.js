/**
 * Created by fantasylin on 5/11/17.
 */

(function () {

    "use strict";

    angular.module("state.services")
        .factory("CapabilityServices", CapabilityServicesFn);

    CapabilityServicesFn.$inject = ['$http']

    function CapabilityServicesFn($http) {
        var self = {
            getCapability: _getCapability
        };

        return self;

        function _getCapability(system, successFn) {
            $http.get("http://123.56.135.196:4202/RSMS/api/rest/mcs/capability/" + system).success(successFn);
        }
    }

})();