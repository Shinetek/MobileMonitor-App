(function () {

    'use strict';

    angular.module('starter.controllers').
        controller('L1FastViewController', L1FastViewCtrlFn);

    L1FastViewCtrlFn.$inject = ['L1FastViewServices', '$scope'];

    function L1FastViewCtrlFn(L1FastViewServices, $scope) {
        var self = this;
        // 当前navTab
        self.instNavCurrentItem = 'cxy';
        // 任务列表
        self.currentTaskList = [];

        // 初始化页面
        self.pageInit = _pageInit;
        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;

        function _pageInit() {
            //获取仪器任务时间表
            var instName = self.instNavCurrentItem;
            // var url = CONFIG_GLOBAL.BASEURL + "api/timetable/cxy/20170424";
            var url = CONFIG_GLOBAL.BASEURL + '/api/apparatus/' + instName;
            L1FastViewServices.getInistTaskList(url, function(doc) {
                alert(JSON.stringify(doc));
                if (doc === null || doc === undefined) {
                    return;
                }
                self.currentTaskList.splice(0, self.currentTaskList.length);
                doc['task'].forEach(function(element) {
                    if (element.name === '全圆盘' && element.status === '1' &&
                        element.id !== undefined) {
                        // 临时增加 imgUrl属性
                        element.imgUrl = 'http://pic.qiantucdn.com/58pic/19/31/02/30P58PICNjD_1024.jpg';
                        self.currentTaskList.push(element);
                    }
                });
                alert(JSON.stringify(self.currentTaskList));
            }, function(err) {

            });
        }

        function _instNavItemIsSelected(navName) {
            return self.instNavCurrentItem === navName;
        }

        function _selectInstNavItem(navName) {
            self.instNavCurrentItem = navName;
        }

    }

})();
