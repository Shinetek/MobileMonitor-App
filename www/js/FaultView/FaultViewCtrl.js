/**
 * Created by qq on 2017/4/25.
 */
angular
    .module('starter.controllers')
    .controller('FaultViewCtrl',FaultViewCtrl)

FaultViewCtrl.$inject = ['$scope', 'SQLiteService', 'HttpService', 'Systems', '$ionicPopover'];

function FaultViewCtrl($scope, SQLiteService, HttpService, Systems, $ionicPopover){

    console.log("FaultViewCtrl");
    var date = new Date();
    $scope.isShow = true;

    $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    });

    // .fromTemplateUrl() 方法
    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover =  popover;
    });

    console.log("fromTemplateUrl" + $scope.popover == null);

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function() {
        // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function() {
        // 执行代码
    });
    //document.getElementById("datePicker").value = date.toISOString().substr(0, 10);

    var s
    var ss = new Array();
    HttpService.getdata("guzhang.json").then(function(res){
        for(var i = 0;i<res.length;i++){
            s = new Object();
            s.code = res[i].code;
            s.describe = res[i].describe;
            s.happen_dt = updateDateTime(res[i].happen_dt);
            s.status = (res[i].status);

            ss[i] = s;
        }
    })


    function updateDateTime(datetime){

        var datestring = "";
        datestring +=datetime.substr(0,4) + "-";
        datestring +=datetime.substr(4,2) + "-";
        datestring +=datetime.substr(6,2) + " ";
        datestring +=datetime.substr(8,2) + ":";
        datestring +=datetime.substr(10,2) + ":";
        datestring +=datetime.substr(12,2);

        return datestring;
    }

    function updateStatus(status){
        var text ;
        switch (status){
            case "undeal":text = "未处理";
                break;
            default :text = "已处理";
                break;
        }
        return text;
    }

    $scope.faults = ss;
}