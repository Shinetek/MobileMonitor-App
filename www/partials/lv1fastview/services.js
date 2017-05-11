(function () {

    "use strict";

    angular.module("starter")
    .factory("L1FastViewServices", L1FastViewServicesFn);

    L1FastViewServicesFn.$inject = ["$http"];

    function L1FastViewServicesFn($http) {
        var _taskList = new Array();
        return {
	        getInistTaskList: _getInistTaskList,
            getTask: _getTask,
            initTaskList: _initTaskList
        };

        function _initTaskList(taskList) {
            _taskList.splice(0, _taskList.length);
            taskList.forEach(function (item) {
                _taskList.push(item);
            });
        }

        function _getTask(taskID) {
            for (var i = 0; i < _taskList.length; i++) {
                if (_taskList[i].task_id === taskID) {
                     return _taskList[i];
                }
            }
        }

        function _getInistTaskList(url, successFn, errorFn) {
            $http.get(url).success(successFn).error(errorFn);
        }
    }

})();