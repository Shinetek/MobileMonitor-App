(function () {

    "use strict";
    angular.module("starter")
    .factory("L1FastViewServices", L1FastViewServicesFn);

    L1FastViewServicesFn.$inject = ["$http"];

    function L1FastViewServicesFn($http) {
        return {
            getInistTaskList: _getInistTaskList
        };

        function _getInistTaskList(url, successFn, errorFn) {
            $http.get(url).success(successFn).error(errorFn);
        }
    }

})();
