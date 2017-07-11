/**
 * Created by admin on 2017/7/11.
 */

angular
    .module("starter.controllers")
    .controller("ReleaseCtrl",ReleaseCtrl);
ReleaseCtrl.$inject = ["$scope","$rootScope","$location"];

function ReleaseCtrl($scope,$rootScope,$location){
    $scope.$on('$ionicView.beforeEnter', function() {
       var path = $location.path();
        console.log(path)
        if(path == "/tab/affiche/release"){
            $rootScope.hideTabs = true;
        }
    });
    $scope.$on('$ionicView.beforeLeave',function(){
        var path = $location.path();
        if(path != "/tab/affiche/release"){
            $rootScope.hideTabs = false;
        }
    });
}

