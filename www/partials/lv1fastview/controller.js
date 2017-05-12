(function () {

    "use strict";

    angular.module("starter.controllers")
        .controller("L1FastViewController", L1FastViewCtrlFn)
        .controller("BigImgViewController", BigImgViewCtrlFn);

    L1FastViewCtrlFn.$inject = ["L1FastViewServices", "$scope"];

    BigImgViewCtrlFn.$inject = ["L1FastViewServices", "$scope", "$stateParams"];

    function BigImgViewCtrlFn(L1FastViewServices, $scope, $stateParams) {
        var self = this;
        self.task = {};
        self.pageInit = _pageInit;

        function _pageInit() {
            var taskID = $stateParams.taskID;
            var tmp = L1FastViewServices.getTask(taskID);
            self.task.name = tmp.name;
            self.task.time = tmp.time;
            self.bigImgUrl = tmp.imgUrl.replace("&thum=1", "&thum=0");
        }
    }

    function L1FastViewCtrlFn(L1FastViewServices, $scope) {
        var self = this;
        // 当前navTab
        self.instNavCurrentItem = 'agri';
        // 任务列表
        self.currentTaskList = [];
        // 是否显示大图
        self.bigImgShow = false;
        // 大图地址 
        self.bigImgUrl = "";

        // 初始化页面
        self.pageInit = _pageInit;
        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;
        // 下拉刷新页面
        self.refreshData = _refreshData;
        // 隐藏大图
        // self.hideBigImg = _hideBigImg;
        // 显示大图
        self.showBigImg = _showBigImg;

        function _showBigImg(taskID) {
            var addname = "#/tab/lv1fastview/bigimg/" + taskID;
            console.log("addname:" + addname);
            window.location.href = addname;
        }

        // function _hideBigImg() {
        // self.bigImgShow = false;
        // }

        function _refreshData() {
            var instName = self.instNavCurrentItem;
            _getTaskListForInst(instName, function (err) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function _pageInit() {
            //获取仪器任务时间表
            var instName = self.instNavCurrentItem;
            _getTaskListForInst(instName, function (err) {

            });
        }

        function _instNavItemIsSelected(navName) {
            return self.instNavCurrentItem === navName;
        }

        function _selectInstNavItem(navName) {
            self.instNavCurrentItem = navName;
            _getTaskListForInst(navName, function (err) {

            });
        }

        function _getTaskListForInst(instName, next) {
            var url = CONFIG_GLOBAL.BASEURL + '_ds/mcs/task/list/' + instName;
            L1FastViewServices.getInistTaskList(url, function (doc) {
                if (doc === null || doc === undefined) {
                    return next();
                }
                self.currentTaskList.splice(0, self.currentTaskList.length);
                doc.forEach(function (element) {
                    // if ((element['task_id'].indexOf('AFN') > -1 ||
                    //     element['task_id'].indexOf('ANN') > -1 ||
                    //     element['task_id'].indexOf('ARN') > -1) &&
                    //     element['status'] === 'success') {
                    //     // 临时增加 imgUrl属性
                    //     var inst = instName.toUpperCase();
                    //     element.imgUrl = 'http://123.56.135.196:4202/fastview/lv1/FY4A/' + instName.toUpperCase() +'/C001/1000M?taskid=' + element['task_id'] + '&btime=' + element['task_id'].substring(3) + '&thum=1';
                    //     console.log(element.imgUrl);
                    //     self.currentTaskList.push(element);
                    // }
                    if ((element['task_id'].indexOf('AFN') > -1 ||
                        element['task_id'].indexOf('ANN') > -1 ||
                        element['task_id'].indexOf('ARN') > -1)) {
                        // 临时增加 imgUrl属性
                        // var inst = instName.toUpperCase();
                        var time = new Date().getTime();
                        element.imgUrl = 'http://123.56.135.196:4202/fastview/lv1/FY4A/' + instName.toUpperCase() +'/C001/1000M?taskid=' + element['task_id'] + '&btime=' + element['task_id'].substring(3) + '&thum=1&time=' + time;
                        console.log(element.imgUrl);
                        self.currentTaskList.push(element);
                    }
                });
                L1FastViewServices.initTaskList(self.currentTaskList);
                next();
            }, function (err) {
                next(err);
            });

        }
    }

})();
