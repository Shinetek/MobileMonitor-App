/**
 * Created by admin on 2017/7/21.
 */

angular
    .module("starter.controllers")
    .controller("ObtxyimgCtrl",ObtxyimgCtrl);
ObtxyimgCtrl.$inject = ["$scope","$http","$stateParams","CanvasTxy"];

function ObtxyimgCtrl($scope,$http,$stateParams,CanvasTxy){


    $scope.number= $stateParams.TaskNumber
    $scope.canimg = "img/GIIRS_background.png"


    //屏幕的高度
    var allheight = document.getElementById("heightall").offsetHeight;
    $scope.allhegiht = allheight - 91 + "px"

    //屏幕的宽度
    var allwidth = document.getElementById("heightall").offsetWidth;
    $scope.allwidth =  allwidth + "px"

    //设置canvas宽高
    var c=document.getElementById('myCanvas');
    var ctx=c.getContext("2d");
    c.width=allwidth;
    c.height=allwidth;

    //画布宽
    var canwidth = document.getElementById("myCanvas").offsetWidth;


    //加载数据
    $scope.$on("$ionicView.afterEnter", function(){
        showdata("giirs")
    })

    //获取单个区域数据
    function showdata(instNavItem){
        var url = CONFIG_GLOBAL.BASEURL +"_ds/mcs/rsms/api/rest/" + instNavItem
        $http({
            method:"GET",
            url:url
        }).success(function(res){
            $scope.singlelist = [];
            for(var i = 0; i < res.length; i++) {
                if (res[i].TaskNumber == $scope.number) {
                    $scope.singlelist.push(res[i])
                }
            }
            $scope.single = $scope.singlelist[0].Params[0]
            count(843,-88,canwidth, $scope.single)
        }).error(function(){
            console.log(err)
        })
    }

    function count(mapsize, mapside,canwidth,res){
        var side =  CanvasTxy.canvasimg( mapsize, mapside,canwidth, res)
        console.log(side)
        ctx.beginPath();
        ctx.fillStyle='rgba(255,94,0,0.5)'
        ctx.fillRect(side.startsow,side.startrow,side.mapwidth,side.mapheight);
    }

    //显示报告版
    $scope.Hold = function(){
        $scope.canshow = true
    }
}