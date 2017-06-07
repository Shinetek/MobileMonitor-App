/**
 * Created by admin on 2017/6/5.
 */

angular
    .module("starter.controllers")
    .controller("FaultDisposeCtrl",FaultDisposeCtrl)
FaultDisposeCtrl.$inject = ["$scope", "$http", "$ionicLoading", "$q", "HttpService", "$stateParams"];

function FaultDisposeCtrl($scope, $http, $ionicLoading, $q, HttpService,$stateParams){

    //获取故障任务与时间
    $scope.code = $stateParams.name.substr(0,3).toLowerCase();

    //延迟加载
    $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var url = "http://10.24.4.130:4701/_ds/mcs/faultlog/allistf/" + $scope.code;
    var promise = HttpService.getdata(url, $http, $q);
        promise.then(function(res){
            $scope.fault = []
            for(var i = 0; i < res.length; i++){
                if(res[i].code == $stateParams.name && res[i].happen_dt == $stateParams.time){
                    $scope.fault.push(res[i]);
                }
            }
            $ionicLoading.hide();
        },function(err){
            console.log(err);
            $ionicLoading.hide();
    })
}