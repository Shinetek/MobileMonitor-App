/**
 * Created by admin on 2017/4/20.
 */
angular
  .module("starter.controllers")
  .controller("ApparatusListCtrl",ApparatusListCtrl);
ApparatusListCtrl.$inject = ["$scope", "$http", "$stateParams", "$ionicLoading", "$q", "HttpService","$ionicScrollDelegate"];
function ApparatusListCtrl($scope, $http, $stateParams, $ionicLoading, $q, HttpService, $ionicScrollDelegate){

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
    $scope.day_plan = 0;
    $scope.success = 0;
    $scope.failure = 0;
    $scope.runing = 0;
    $scope.cur_plan = 0;
    for(var i = 0; i < res.length; i++){
      if(res[i].status == "success"){
        $scope.success++;
      }else if(res[i].status == "failure"){
        $scope.failure++;
      }else if(res[i].status == "running"){
        $scope.runing++;
      }
    }
    $scope.day_plan = res.length;
    $scope.cur_plan = $scope.success + $scope.runing + $scope.failure;

    $scope.listDate = res;
    var subname = $scope.listDate;
    for(var i = 0; i < subname.length; i++){
      if(subname[i].name.length > 2){
        subname[i].name = subname[i].name.substring(0,2);
      }
    }
    $ionicLoading.hide();

    //增加滚动
    var index = null;
    for(var i = 0; i < subname.length; i++){
      if(subname[i].status == "running"){
        index = i
        break;

      }
    }
    var scrollheight =  $scope.gird_height;
    scrollheight = parseInt(scrollheight.height);
    console.log(scrollheight);
    var _heights = parseInt(index/4) * 57
    if(_heights <= scrollheight){
      $ionicScrollDelegate.$getByHandle('small').scrollTo(0,0);
    }else{
      var _height = parseInt(index/4) * 57 - scrollheight + 57;
      console.log(_height)
      $ionicScrollDelegate.$getByHandle('small').scrollTo(0,_height,true);
    }
  }, function(err){
    console.log("err");
    $ionicLoading.hide();
  });

  //下拉刷新数据

  $scope.new = function(){
    var url = 'http://10.24.4.130:4701/_ds/mcs/task/list/' + $scope.name;
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function(res){

      $scope.day_plan = 0;
      $scope.success = 0;
      $scope.failure = 0;
      $scope.runing = 0;
      $scope.cur_plan = 0;
      for(var i = 0; i < res.length; i++){
        if(res[i].status == "success"){
          $scope.success++;
        }else if(res[i].status == "failure"){
          $scope.failure++;
        }else if(res[i].status == "running"){
          $scope.runing++;
        }
      }
      $scope.day_plan = res.length;
      $scope.cur_plan = $scope.success + $scope.runing + $scope.failure;


      $scope.listDate = res;
      var subname = $scope.listDate;
      for(var i = 0; i < subname.length; i++){
        if(subname[i].name.length > 2){
          subname[i].name = subname[i].name.substring(0,2);
        }
      }

      var index = null;
      for(var i = 0; i < subname.length; i++){
        if(subname[i].status == "running"){
          index = i
          break;
        }
      }
      var scrollheight =  $scope.gird_height;
      scrollheight = parseInt(scrollheight.height);
      console.log(scrollheight);
      var _heights = parseInt(index/4) * 57
      if(_heights <= scrollheight){
        $ionicScrollDelegate.$getByHandle('small').scrollTo(0,0);
      }else{
        var _height = parseInt(index/4) * 57 - scrollheight + 57;
        console.log(_height)
        $ionicScrollDelegate.$getByHandle('small').scrollTo(0,_height,true);
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
