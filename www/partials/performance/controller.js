/**
 * Created by fantasylin on 5/10/17.
 */

(function () {

    "use strict";

    angular.module("state.controller")
        .controller("NRSPerformanceController", NRSPerCtrlFn);

    NRSPerCtrlFn.$inject = ["PerformanceServices", "$scope"];

    function NRSPerCtrlFn(PerformanceServices, $scope) {
        var self = this;

        // 当前navTab
        self.instNavCurrentItem = 'agri';
        // 初始化页面
        self.pageInit = _pageInit;
        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;
        // 下拉刷新页面
        self.refreshData = _refreshData;

        function _refreshData() {

        }
        function _pageInit() {

        }

        function _instNavItemIsSelected(navName) {
            return self.instNavCurrentItem === navName;
        }

        function _selectInstNavItem(navName) {
            self.instNavCurrentItem = navName;
        }
    }

})
