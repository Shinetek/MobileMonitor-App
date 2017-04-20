/**
 * Created by qq on 2017/4/18.
 */
define([], function () {
  function ctrl($scope, $http, $q, $ionicLoading, HttpService){
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/instlistconfig';
    var promise = HttpService.getdata(url,$http, $q)
    promise.then(function (res) {
      $scope.jsonData = res;
      $ionicLoading.hide();
    },function(err){
      alert("shibai");
    })

    $scope.updateFileList = function(instname){
      var addr = "#/tab/fastView/"+instname;
      console.log("addr : " + addr);
      window.location.href=addr;
    }
  }

  ctrl.$inject = ['$scope', '$http', '$q', '$ionicLoading', 'HttpService'];
  return ctrl;
});
