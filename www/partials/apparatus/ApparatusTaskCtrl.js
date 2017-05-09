/**
 * Created by admin on 2017/4/20.
 */
angular
  .module("starter.controllers")
  .controller("ApparatusTaskCtrl",ApparatusTaskCtrl);
ApparatusTaskCtrl.$inject = ["$scope", "$http", "$stateParams", "$ionicLoading", "$q", "HttpService"];
function ApparatusTaskCtrl($scope, $http, $stateParams, $ionicLoading, $q, HttpService){

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0
  });

  var url = "http://10.24.4.130:4701/_ds/mcs/task/detail/" + $stateParams.listname + "/" + $stateParams.task_id;
  var promise = HttpService.getdata(url,$http,$q);
  promise.then(function(res){
    $scope.name = $stateParams.name;
    $scope.time = $stateParams.time;
    $scope.taskalls = res;
    $ionicLoading.hide();
  },function(err){
    console.log("失败");
    $ionicLoading.hide();
  });

  //增加背景颜色变化
  $scope.upbackground = function(status){
    if(status == "success"){
      return "#5A9055";
    }else if(status == "failure"){
      return "#D9534F";
    }else if(status == "waiting"){
      return "#AAAAAA"
    }
  };
}
