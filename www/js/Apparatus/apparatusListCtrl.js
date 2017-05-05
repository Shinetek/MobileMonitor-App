/**
 * Created by admin on 2017/4/20.
 */
angular
  .module("starter.controllers")
  .controller("ApparatusListCtrl",ApparatusListCtrl);
ApparatusListCtrl.$inject = ["$scope", "$http", "$stateParams", "$ionicLoading", "$q", "HttpService","$ionicScrollDelegate","NumberService","HeightService"];
function ApparatusListCtrl($scope, $http, $stateParams, $ionicLoading, $q, HttpService, $ionicScrollDelegate,NumberService,HeightService){

  //标题名称
  $scope.name = $stateParams.listname;
  if($scope.name == "agri"){
    $scope.rename = "成像仪状态";
  }else if($scope.name == "giirs"){
    $scope.rename = "探测仪状态";
  }else if($scope.name == "lmi"){
    $scope.rename = "闪电仪状态";
  }

  //获取滚动视图高度
  //console.log(document.getElementById("heightall").offsetHeight);
  //$scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-259+"px"};
  //少20px为手机端与浏览器端高度塌陷值
  $scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-239+"px"};


  //延迟加载
  $ionicLoading.show({
    content: "Loading",
    animation: "fade-in",
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });


  //计划与列表数据
  var url = 'http://10.24.4.130:4701/_ds/mcs/task/list/' + $scope.name;
  var promise = HttpService.getdata(url, $http, $q);
  promise.then(function(res){
    $scope.listDate = res;
    var results = NumberService.getnumber(res);
    $scope.day_plan = results.day_plan;
    $scope.cur_plan = results.cur_plan;
    $scope.success = results.success;
    $scope.failure = results.failure;

    for(var i = 0; i < res.length; i++){
      if(res[i].name.length > 2){
        res[i].name = res[i].name.substring(0,2);
      }
    }
    $ionicLoading.hide();

    //增加滚动
    var heightall = HeightService.getheight($scope.listDate,$scope.gird_height);
    $ionicScrollDelegate.$getByHandle('small').scrollTo(0,heightall,true);

  }, function(err){
    console.log("err");
    $ionicLoading.hide();
  });

  //下拉刷新数据

  $scope.new = function(){
    var url = 'http://10.24.4.130:4701/_ds/mcs/task/list/' + $scope.name;
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function(res){
      $scope.listDate = res;

      //计算观测计划数
      var results = NumberService.getnumber(res);
      $scope.day_plan = results.day_plan;
      $scope.cur_plan = results.cur_plan;
      $scope.success = results.success;
      $scope.failure = results.failure;

      //截取名称字段
      for(var i = 0; i < res.length; i++){
        if(res[i].name.length > 2){
          res[i].name = res[i].name.substring(0,2);
        }
      }

      //增加滚动
      var heightall = HeightService.getheight($scope.listDate,$scope.gird_height);
      $ionicScrollDelegate.$getByHandle('small').scrollTo(0,heightall,true);

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

  //点击回到顶部
  $scope.scrollTop = function(){
    $ionicScrollDelegate.$getByHandle('small').scrollTop(true);
  }

  $scope.taskdetail = function(task_id,name,time){
    //获取当前任务名称与时间
    //$scope.tasknames = tasknames;
    //$scope.tasktimes = tasktimes;
    //console.log($scope.tasknames,$scope.tasktimes);

    //增加当前任务跳转

    var addtask = "#/tab/subsystem/apparatus/" + $stateParams.listname + "/" + name + "/"+ time +"/" + task_id;
    console.log("addtask" + addtask);
    window.location.href = addtask;
  };

}
