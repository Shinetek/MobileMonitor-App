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


  $scope.$on("$ionicView.afterEnter",function(){

    //获取滚动视图高度
    //console.log(document.getElementById("heightall").offsetHeight);
    //$scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-259+"px"};
    //少20px为手机端与浏览器端高度塌陷值
    //$scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-239+"px"};
    $scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight-121+"px"};


    //延迟加载
    $ionicLoading.show({
      content: "Loading",
      animation: "fade-in",
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


    //计划与列表数据
    var url = 'http://123.56.135.196:4202/_ds/mcs/task/list/' + $scope.name;
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function (res) {
      $scope.listDate = res;
      //计算观测计划数
      var results = NumberService.getnumber(res);
      $scope.day_plan = results.day_plan;
      $scope.cur_plan = results.cur_plan;
      $scope.success = results.success;
      $scope.failure = results.failure;

      $ionicLoading.hide();

      _heightall($scope.listDate, $scope.gird_height);

    }, function (err) {
      console.log("err");
      $ionicLoading.hide();
    });

  });

  //增加滚动
  function _heightall(data,height){
    var heightall = HeightService.getheight(data,height);
    $ionicScrollDelegate.$getByHandle('small').scrollTo(0,heightall,true);
  }

  //下拉刷新数据
  $scope.new = function(){
    var url = 'http://123.56.135.196:4202/_ds/mcs/task/list/' + $scope.name;
    $http({
      method:"GET",
      url:url
    }).success(function(data){
      $scope.listDate = data;
      //计算观测计划数
      var results = NumberService.getnumber(data);
      $scope.day_plan = results.day_plan;
      $scope.cur_plan = results.cur_plan;
      $scope.success = results.success;
      $scope.failure = results.failure;

      //_heightall($scope.listDate,$scope.gird_height);
    }).error(function(error){
        console.log("error");
    })
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
  };

  //增加当前任务跳转
  $scope.taskdetail = function(task_id){
    var addtask = "#/tab/subsystem/apparatus/" + $stateParams.listname + "/" + task_id;
    window.location.href = addtask;
  };
}
