/**
 * Created by admin on 2017/4/20.
 */
angular
  .module("starter.controllers")
  .controller("ApparatusListCtrl",ApparatusListCtrl);
ApparatusListCtrl.$inject = ["$scope", "$http", "$stateParams", "$ionicLoading", "$q", "HttpService"];
function ApparatusListCtrl($scope, $http, $stateParams, $ionicLoading, $q, HttpService){

  //标题名称
  $scope.name = $stateParams.listname;
  if($scope.name == "cxy"){
    $scope.rename = "成像仪状态";
    $scope.inst = "agri";
  }else if($scope.name == "tcy"){
    $scope.rename = "探测仪状态";
    $scope.inst = "giirs";
  }else if($scope.name == "sdy"){
    $scope.rename = "闪电仪状态";
    $scope.inst = "lmi";
  }

  //延迟加载
  $ionicLoading.show({
    content: "Loading",
    animation: "fade-in",
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });
  //计划数与任务表数据

  var url = 'http://10.24.4.130:4701/_ds/mcs/task/list/' + $scope.inst;
  var promise = HttpService.getdata(url, $http, $q);
  promise.then(function(res){
    $scope.listDate = res;
    var subname = $scope.listDate;
    for(var i = 0; i < subname.length; i++){
      if(subname[i].name.length == "4"){
        subname[i].name = subname[i].name.substring(0,2);
      }else if(subname[i].name.length == "7"){
        subname[i].name = subname[i].name.substring(0,3);
      }
    }
    $ionicLoading.hide();
  }, function(err){
    console.log("err");
    $ionicLoading.hide();
  });

  //下拉刷新数据

  $scope.new = function(){
    var url = 'http://10.24.4.130:4701/_ds/mcs/task/list/' + $scope.inst;
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function(res){
      $scope.listDate = res;
      var subname = $scope.listDate;
      for(var i = 0; i < subname.length; i++){
        if(subname[i].name.length == "4"){
          subname[i].name = subname[i].name.substring(0,2);
        }else if(subname[i].name.length == "7"){
          subname[i].name = subname[i].name.substring(0,3);
        }
      }
    });
    $scope.$broadcast('scroll.refreshComplete');
  };

  //背景颜色控制
  $scope.upBackground = function(status){
    if(status == "success"){
      return "#5A9055";
    }else if(status == "failure"){
      return "#D9534F";
    }else if(status == "running"){
      return "#28CDE0";
    }else{
      return "#E0E0E0";
    }
  };

  //获取滚动视图高度
  //console.log(document.getElementById("heightall").offsetHeight);
  //$scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-259+"px"};
  //少20px为手机端与浏览器端高度塌陷值
  $scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-239+"px"};

  $scope.taskall = function(taskid){
    //获取当前任务名称与时间
    //$scope.tasknames = tasknames;
    //$scope.tasktimes = tasktimes;
    //console.log($scope.tasknames,$scope.tasktimes);

    //增加当前任务跳转

    var addtask = "#/tab/subsystem/apparatus/" + $stateParams.listname + "/" + taskid;
    console.log("addtask" + addtask);
    window.location.href = addtask;
  };
}
