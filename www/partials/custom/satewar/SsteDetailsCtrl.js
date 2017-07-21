/**
 * Created by admin on 2017/7/21.
 */

angular
    .module("starter.controllers")
    .controller("SateDetailsCtrl",SateDetailsCtrl);
SateDetailsCtrl.$inject = ["$scope","$http","$ionicLoading","$stateParams"];

function SateDetailsCtrl($scope,$http,$ionicLoading,$stateParams){

    var warname = "mcs"
    $scope.id = $stateParams.id
    console.log($scope.id)

    //延迟加载
    $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    //加载数据
    $scope.$on("$ionicView.afterEnter", function(){
        showdata()
    })


    //获取mcs数据
    function showdata(){
        var url = "http://123.56.135.196:4202/_ds/mcs/faultlog/allistf/" + warname
        $http({
            method:"GET",
            url:url
        }).success(function(res){
            $scope.fault = [];

            for(var i = 0; i < res.length; i++){
                if(res[i]._id == $scope.id){
                    $scope.fault.push(res[i])
                    console.log($scope.fault)
                }
            }
            $ionicLoading.hide();

        }).error(function(){
            console.log("error");
            $ionicLoading.hide();
        })
    }


}