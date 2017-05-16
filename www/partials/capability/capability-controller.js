/**
 * Created by fantasylin on 5/10/17.
 */

(function () {

    "use strict";

    angular.module("starter.controllers")
        .controller("NRSCapabilityController", NRSCapabilityCtrlFn)
        .controller("DTSMRSCapabilityController", DTSMRSCapabilityCtrlFn);

    NRSCapabilityCtrlFn.$inject = ["CapabilityServices", "$scope"];

    DTSMRSCapabilityCtrlFn.$inject = ["CapabilityServices", "$scope", "$stateParams"];

    function DTSMRSCapabilityCtrlFn(CapabilityServices, $scope, $stateParams) {
        var self = this;

        self.capabilityItems = [];

        self.pageInit = _pageInit;
        self.refreshData = _refreshData;

        function _refreshData() {
            var sys = $stateParams.sys;
            _getCapability(sys, function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function _pageInit() {
            // console.log($stateParams);
            var sys = $stateParams.sys;
            _getCapability(sys, function () {

            });
        }

        function _getCapability(sysName, next) {
            CapabilityServices.getCapability(sysName, function (doc) {
                if (!doc) return next();
                self.capabilityItems.splice(0, self.capabilityItems.length);
                for (var i = 0; i < doc.data.length; i++) {
                    if (doc.data[i].status === "success") {
                        doc.data[i].statusImg = "../../img/check_128px_1180491_easyicon.net.png";
                    } else {
                        doc.data[i].statusImg = "../../img/error_128px_1181827_easyicon.net.png";
                    }
                    self.capabilityItems.push(doc.data[i]);
                }
                if (next) {
                    return next();
                }
            });
        }
    }

    function NRSCapabilityCtrlFn(CapabilityServices, $scope) {
        var self = this;

        // 当前navTab
        self.instNavCurrentItem = 'agri';

        self.capabilityItems = [];

        // 初始化页面
        self.pageInit = _pageInit;
        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;
        // 下拉刷新页面
        self.refreshData = _refreshData;

        function _refreshData() {
            _getCapability(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function _pageInit() {
            _getCapability(function () {

            });
        }

        function _getCapability(next) {
            CapabilityServices.getCapability("NRS", function (doc) {
                if (!doc) return next();
                var inst = self.instNavCurrentItem.toUpperCase();
                while (inst.length < 6) {
                    inst += "-";
                }
                self.capabilityItems.splice(0, self.capabilityItems.length);
                for (var i = 0; i < doc.data.length; i++) {
                    if (doc.data[i]["instrument"] === inst) {
                        doc.data[i]["param"].forEach(function (item) {
                            if (item.status === "success") {
                                item.statusImg = "../../img/check_128px_1180491_easyicon.net.png";
                            } else {
                                item.statusImg = "../../img/error_128px_1181827_easyicon.net.png";
                            }
                            self.capabilityItems.push(item);
                        });
                    }
                }
                next();
            });
        }

        function _instNavItemIsSelected(navName) {
            return self.instNavCurrentItem === navName;
        }

        function _selectInstNavItem(navName) {
            self.instNavCurrentItem = navName;
            _getCapability(function () {

            });
        }
    }

})();
