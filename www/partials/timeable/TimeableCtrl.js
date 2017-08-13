/**
 * Created by admin on 2017/7/27.
 */

angular
    .module("starter.controllers")
    .controller("TimeableCtrl",TimeableCtrl);
TimeableCtrl.$inject = ["$scope","$http"];

function TimeableCtrl($scope,$http){




    var timeheight = document.getElementById("timeheight").offsetHeight;
    $scope.timehegiht = timeheight - 133 + "px";
    $scope.high = timeheight - 133

    //屏幕的宽度
    var timewidth = document.getElementById("timeheight").offsetWidth;
    $scope.timewidth =  timewidth + "px";

    var instNavItem = "agri"
    showimg(instNavItem)

    //上来为成像仪选中
    $scope.instNavItemIsSelected = function(navName){
        return instNavItem == navName;

    }

    $scope.selectInstNavItem = function(navName){
        instNavItem = navName;
        showimg(navName)
    }


    function showimg(navName){
        var url = "http://123.56.135.196:4202/_ds/mcs/rsms/api/rest/timetablesvg/" + navName +"/" + timewidth + "/" + $scope.high
        console.log(url)
        $http({
            method:"GET",
            url:url
        }).success(function(data){
            //$scope.data = data
            document.getElementById("svgss").innerHTML = data;
        }).error(function(error){
            console.log("error")
        })
    }

}