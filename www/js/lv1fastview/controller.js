(function () {

    "use strict";

    angular.module("starter.controllers")
        .controller("L1FastViewController", L1FastViewCtrlFn);
    
    L1FastViewCtrlFn.$inject = ["L1FastViewServices", "$scope"];
    
    function L1FastViewCtrlFn(L1FastViewServices, $scope) {
        var self = this;
        // 当前navTab
        self.instNavCurrentItem = "sdy";

        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;

        function _instNavItemIsSelected(navName) {
            return self.instNavCurrentItem === navName;
        }

        function _selectInstNavItem(navName) {
            alert("1");
            self.instNavCurrentItem = navName;
        }

    }

})();