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

  var url = "http://10.24.4.130:4701/api/apparatus/" + $stateParams.listname + "/tasklist";
  var promise = HttpService.getdata(url,$http,$q);
  promise.then(function(res){
    var  database = res;
    for(var i = 0; i < database.length; i++){
      if(database[i].id == $stateParams.taskid){
        $scope.taskalls = database[i];
        console.log($scope.taskalls);
        $ionicLoading.hide();
        return;
      }
    }
  },function(err){
    console.log("失败");
  });

  //增加背景颜色变化
  $scope.upbackground = function(status){
    if(status == "1"){
      return "#5A9055";
    }else if(status == "0"){
      return "#D9534F";
    }
  };

  //增加字体颜色变化
  $scope.upcolor = function(status){
    if(status == "1"){
      return "#5A9055";
    }else if(status == "0"){
      return "#D9534F";
    }
  };

}
