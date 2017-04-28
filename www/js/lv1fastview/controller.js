(function () {

    "use strict";

    angular.module("starter.controllers")
        .controller("L1FastViewController", L1FastViewCtrlFn);

    L1FastViewCtrlFn.$inject = ["L1FastViewServices", "$scope"];

    function L1FastViewCtrlFn(L1FastViewServices, $scope) {
        var self = this;
        // 当前navTab
	    self.instNavCurrentItem = 'agri';
        // 任务列表
        self.currentTaskList = [];

        // 初始化页面
        self.pageInit = _pageInit;
        // 判断页签是否为选中状态
        self.instNavItemIsSelected = _instNavItemIsSelected;
        // 选择页签
        self.selectInstNavItem = _selectInstNavItem;
	    // 下拉刷新页面
	    self.refreshData = _refreshData;

	    function _refreshData() {
		    var instName = self.instNavCurrentItem;
		    _getTaskListForInst(instName, function(err) {

		    });
	    }

        function _pageInit() {
            //获取仪器任务时间表
            var instName = self.instNavCurrentItem;
	        _getTaskListForInst(instName, function(err) {

	        });
        }

	    function _instNavItemIsSelected(navName) {
		    return self.instNavCurrentItem === navName;
	    }

	    function _selectInstNavItem(navName) {
		    self.instNavCurrentItem = navName;
		    _getTaskListForInst(navName, function(err) {

		    });
	    }

	    function _getTaskListForInst(instName, next) {
		    // var url = CONFIG_GLOBAL.BASEURL + "api/timetable/cxy/20170424";
		    var url = CONFIG_GLOBAL.BASEURL + '_ds/mcs/task/list/' + instName;
		    L1FastViewServices.getInistTaskList(url, function(doc) {
			    if (doc === null || doc === undefined) {
				    return;
			    }
			    self.currentTaskList.splice(0, self.currentTaskList.length);
			    doc.forEach(function(element) {
				    if ((element['task_id'].indexOf('AFN') > -1 ||
					    element['task_id'].indexOf('ANN') > -1 ||
					    element['task_id'].indexOf('ARN') > -1) &&
					    element['status'] === 'success') {
					    // 临时增加 imgUrl属性
					    //element.imgUrl = 'http://pic.qiantucdn.com/58pic/19/31/02/30P58PICNjD_1024.jpg';
					    element.imgUrl = 'http://123.56.135.196:4202/fastview/lv1/FY4A/AGRI/C001/4000M?taskid=AFN20170425000000&btime=20170425000000&thum=1';
					    self.currentTaskList.push(element);
				    }
			    });
			    next();
		    }, function(err) {
			    next(err);
		    });

	    }
    }

})();
