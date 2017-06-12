/**
 * Created by qq on 2017/4/25.
 */
angular
    .module('starter.controllers')
    .controller('FaultViewCtrl', FaultViewCtrl)

FaultViewCtrl.$inject = ['$scope', 'SQLiteService', 'HttpService', 'FaultID', '$ionicPopover', '$ionicLoading', 'PopoverService'];

function FaultViewCtrl($scope, SQLiteService, HttpService, FaultID, $ionicPopover, $ionicLoading, PopoverService) {

    var date = new Date();

    $scope.isShow = true;

    $scope.data = {};
    $scope.data.currdate = date;
    $scope.data.queryDescribe = "";
    $scope.data.queryDealType = "未处理";
    $scope.data.querySystemName = FaultID.faultname()[0].id;

    $scope.faults = new Array();

    $scope.querySystems = FaultID.faultname();

    var _startIndex = 1;
    var _pageSize = 50;

    $scope.$on('$ionicView.afterEnter', function () {
        console.log("ionicView.afterEnter Init");
        PopoverService.initPop($scope, $ionicPopover, 'my-popover.html');
        //updateFaultData();
        updateFaultAll()
    })

    $scope.refreshData = function () {
        var sysid = $scope.data.querySystemName.toLowerCase();

        $scope.faults = new Array();

        _startIndex = 1

        console.log("previewData");
        if(sysid == "全部"){
            updateFaultAll()
        }else{
            updateFaultData();
        }
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.nextData = function () {
        var sysid = $scope.data.querySystemName.toLowerCase();

        _startIndex += 50;

        console.log("nextData");
        if(sysid == "全部"){
            updateFaultAll()
        }else{
            updateFaultData();
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }


    function updateFaultAll(){

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        var dealtype = updateStatus($scope.data.queryDealType);
        var url = "http://10.24.4.130:4701/_ds/mcs/faultlog/codelistf/"+ dealtype + "/" + _startIndex + "/" + _pageSize;
        HttpService.getdata(url).then(function(res){
            $scope.faults = [];
            for (var i = 0; i < res.length; i++) {
                res[i] = res[i];
                res[i].status = updateStatus(res[i].status);
                $scope.faults.push(res[i]);
            }
            if (res.length < 50)
                isShow = false;
            else
                isShow = true;

            $ionicLoading.hide();
        },function(error){
            console.log("error");
            $ionicLoading.hide();
        });

    }


    function updateFaultData() {

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        // 故障的处理状态
        var dealtype = updateStatus($scope.data.queryDealType);
        var sysid = $scope.data.querySystemName.toLowerCase();

        // 获取当前显示的故障数据 _ds/mcs/faultlog/listf/dts/undeal/1/50
        //var url = CONFIG_GLOBAL.BASEURL + "_ds/mcs/faultlog/listf/" + sysid + "/" + dealtype + "/" + _startIndex + "/" + _pageSize;
        var url = "http://10.24.4.130:4701/" + "_ds/mcs/faultlog/listf/" + sysid + "/" + dealtype + "/" + _startIndex + "/" + _pageSize;
        HttpService.getdata(url).then(function (res) {
            $scope.faults = [];
            for (var i = 0; i < res.length; i++) {
                res[i] = res[i];
                //res[i].happen_dt = StaticMethodService.formatLongDatTime(res[i].happen_dt);
                res[i].status = updateStatus(res[i].status);
                $scope.faults.push(res[i]);
            }

            console.log("updateFaultData success.");

            if (res.length < 50)
                isShow = false;
            else
                isShow = true;

            console.log("isShow : " + isShow)

            $ionicLoading.hide();

            console.log("$scope.faults : " + $scope.faults.length)
            //$scope.$broadcast('scroll.refreshComplete');

        }, function (err) {

            isShow = false;
            console.log("isShow : " + isShow)

            $ionicLoading.hide();
            //$scope.$broadcast('scroll.refreshComplete');

        })
    }

    $scope.filterData = function () {
        var sysid = $scope.data.querySystemName.toLowerCase();
        console.log("$scope.data.currdate : " + $scope.data.currdate.toISOString().substr(0, 10));
        console.log("$scope.data.queryDescribe : " + $scope.data.queryDescribe);
        console.log("$scope.data.queryType : " + $scope.data.queryType);

        $scope.faults = new Array();
        _startIndex = 1

        if(sysid == "全部"){
            updateFaultAll()
        }else{
            updateFaultData();
        }

    }

    function updateStatus(status) {
        var text;
        switch (status) {
            case "undeal":
                text = "未处理";
                break;
            case "deal":
                text = "已处理";
                break;
            case "未处理":
                text = "undeal";
                break;
            case "已处理":
                text = "deal";
                break;
        }
        return text;
    }

    //增加跳转

    $scope.openDeal = function(name,time){
        var dealwith = "#/tab/subsystem/faultview/" + name + "/" + time;
        console.log("addname:" + dealwith);
        window.location.href = dealwith;
    }

}