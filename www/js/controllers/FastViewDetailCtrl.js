/**
 * Created by qq on 2017/4/18.
 */
define([], function () {
  function ctrl($scope, $stateParams, $http, $q, $ionicLoading,  HTTPGET){
    $scope.instrumentName = $stateParams.instname;
    $scope.updateTimeString = function(datetimeString){
      var strs= new Array(); //定义一数组
      strs= datetimeString.split(" ");
      return strs[1]
    }
    $scope.updateBackground = function(state){
      if(state == 'done')
      {
        return "DarkGreen";
      }
      else if(state == 'error')
      {
        return "#e45050";
      }
      else if(state == 'warn')
      {
        return "#ddb411";
      }
      else
      {
        return "Gray";
      }
    }
    $scope.getImageData = function(){
      $http({
        method:'Get',
        url:'http://10.24.4.139:8080/fy3d/api/basedataserver/l1image/single/mersi2/20170328/0000/d/a/0000&ch01&20'
      }).success(function(data,staus,headers,config){
        console.log("get image success...");
        console.log(data);
        //$scope.orbitModels = data;
      }).error(function(data,status,headers,config){
        console.log("get image error...");
      })
    }

    $scope.init = function() {
      var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/collect/l0static/20170320/' + $stateParams.instname + '/dpt/ad/r';
      var promise = HTTPGET.getdata(url, $http, $q);
      promise.then(function (res) {
        $scope.orbitModels = res;
      })

      $scope.$broadcast('scroll.refreshComplete');
    }

    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/collect/l0static/20170320/' + $stateParams.instname + '/dpt/ad/r';
    var promise = HTTPGET.getdata(url, $http, $q);
    promise.then(function (res) {
      $scope.orbitModels = res;
      $ionicLoading.hide();
    })
  }

  ctrl.$inject = ['$scope', '$stateParams', '$http', '$q', '$ionicLoading', 'HTTPGET'];
  return ctrl;
});
