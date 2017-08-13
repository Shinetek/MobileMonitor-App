/**
 * Created by admin on 2017/7/21.
 */

angular
    .module("starter.controllers")
    .controller("ObserveCtrl",ObserveCtrl);
ObserveCtrl.$inject = ["$scope","$http","$ionicLoading"];

function ObserveCtrl($scope,$http,$ionicLoading){


    var instNavItem = "agri"

    $scope.$on("$ionicView.afterEnter",function(){
        $ionicLoading.show({
            content: "Loading",
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
        
        showdata(instNavItem)
    })

    //上来为成像仪选中
    $scope.instNavItemIsSelected = function(navName){
        return instNavItem == navName;

    }

    $scope.selectInstNavItem = function(navName){
        instNavItem = navName;
        showdata(navName)
    }

    function showdata(instNavItem){

        var url = CONFIG_GLOBAL.BASEURL +"_ds/mcs/rsms/api/rest/" + instNavItem;
        $http({
            method:"GET",
            url:url
        }).success(function(res){
            $scope.timelist = res
            $ionicLoading.hide();
        }).error(function(){
            console.log(err)
            $ionicLoading.hide();
        })
    }


    //跳转页面
    $scope.choice = function(TaskNumber){
        if(instNavItem == "giirs"){
            var addurl = "#/tab/subsystem/listfault/GSQ/" + instNavItem  + "/" +  TaskNumber;
            console.log(addurl)
            window.location.href = addurl;
        }
    }
}