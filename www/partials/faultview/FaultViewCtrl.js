/**
 * Created by qq on 2017/4/25.
 */
angular
    .module('starter.controllers')
    .controller('FaultViewCtrl', FaultViewCtrl)

FaultViewCtrl.$inject = ['$scope', 'SQLiteService', 'HttpService', 'Systems', '$ionicPopover', '$ionicLoading', 'PopoverService', 'StaticMethodService'];

function FaultViewCtrl($scope, SQLiteService, HttpService, Systems, $ionicPopover, $ionicLoading, PopoverService, StaticMethodService) {

    var date = new Date();

    $scope.isShow = true;

    $scope.data = {};
    $scope.data.currdate = date;
    $scope.data.queryDescribe = "";
    $scope.data.queryType = "ALL";
    $scope.faults = new Array();

    var _startIndex = 1;
    var _pageSize = 50;

    $scope.$on('ionicView.afterEnter',function(){
        PopoverService.initPop($scope, $ionicPopover, 'my-popover.html');
        updateFaultData();
    })

    $scope.refreshData = function () {

        $scope.faults = new Array();

        _startIndex = 1

        console.log("previewData");
        updateFaultData();
        $scope.$broadcast('scroll.refreshComplete');
    }

    $scope.nextData = function () {

        _startIndex += 50;

        console.log("nextData");
        updateFaultData();
        $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function updateFaultData() {

        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });

        // 获取当前显示的故障数据
        var url = CONFIG_GLOBAL.BASEURL + "_ds/mcs/faultlog/list/dtsf/undeal/" + _startIndex + "/" + _pageSize;
        HttpService.getdata(url).then(function (res) {

            for (var i = 0; i < res.length; i++) {
                res[i] = res[i];
                res[i].happen_dt = StaticMethodService.formatLongDatTime(res[i].happen_dt);
                res[i].status = updateStatus(res[i].status);
                $scope.faults.push(res[i]);
            }

            console.log("updateFaultData success.");

            if(res.length < 50)
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

        console.log("$scope.data.currdate : " + $scope.data.currdate.toISOString().substr(0, 10));
        console.log("$scope.data.queryDescribe : " + $scope.data.queryDescribe);
        console.log("$scope.data.queryType : " + $scope.data.queryType);

    }

    function updateStatus(status) {
        var text;
        switch (status) {
            case "undeal":
                text = "未处理";
                break;
            default :
                text = "已处理";
                break;
        }
        return text;
    }
}