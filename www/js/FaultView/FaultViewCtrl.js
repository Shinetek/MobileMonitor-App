/**
 * Created by qq on 2017/4/25.
 */
angular
  .module('starter.controllers')
  .controller('FaultViewCtrl', FaultViewCtrl)

FaultViewCtrl.$inject = ['$scope', 'SQLiteService', 'HttpService', 'Systems', '$ionicPopover', '$ionicLoading'];

function FaultViewCtrl($scope, SQLiteService, HttpService, Systems, $ionicPopover, $ionicLoading) {

  //console.log("FaultViewCtrl");
  var date = new Date();
  $scope.isShow = true;

  $scope.data = {};
  $scope.data.currdate = date;
  $scope.data.queryDescribe = "";
  $scope.data.queryType = "ALL";


  $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  });

  // .fromTemplateUrl() 方法
  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function ($event) {
    $scope.popover.show($event);
  };

  $scope.closePopover = function () {
    $scope.popover.hide();
  };
  // 清除浮动框
  $scope.$on('$destroy', function () {
    $scope.popover.remove();
  });
  // 在隐藏浮动框后执行
  $scope.$on('popover.hidden', function () {
    // 执行代码
  });
  // 移除浮动框后执行
  $scope.$on('popover.removed', function () {
    // 执行代码
  });

  var ss = new Array();

  updateFaultData();

  function updateFaultData() {

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    // 获取当前显示的故障数据
    HttpService.getdata("guzhang.json").then(function (res) {
      for (var i = 0; i < res.length; i++) {
        ss[i] = res[i];
        ss[i].happen_dt = updateDateTime(res[i].happen_dt);
        ss[i].status = (res[i].status);
      }

      $ionicLoading.hide();
    }, function(err){
      $ionicLoading.hide();
    })
  }

  $scope.filterData = function () {

    console.log("$scope.data.currdate : " + $scope.data.currdate.toISOString().substr(0, 10));
    console.log("$scope.data.queryDescribe : " + $scope.data.queryDescribe);
    console.log("$scope.data.queryType : " + $scope.data.queryType);

  }

  // 把时间字符串更新为标准型-YYYY-MM-DD hh
  function updateDateTime(datetime) {

    var datestring = "";
    datestring += datetime.substr(0, 4) + "-";
    datestring += datetime.substr(4, 2) + "-";
    datestring += datetime.substr(6, 2) + " ";
    datestring += datetime.substr(8, 2) + ":";
    datestring += datetime.substr(10, 2) + ":";
    datestring += datetime.substr(12, 2);

    return datestring;
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

  $scope.faults = ss;
}