/**
 * Created by admin on 2017/6/2.
 */

angular
    .module("starter.controllers")
    .controller("TelemeteryCtrl",TelemeteryCtrl);
TelemeteryCtrl.$inject = ["$scope","$http","$ionicLoading", "$q", "HttpService","TeleID"];

function TelemeteryCtrl($scope, $http,$ionicLoading, $q, HttpService,TeleID){

    //设置select下拉选项第一个不为空白效果
    $scope.x = "卫星平台";
    $scope.name = TeleID.telename();

    $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var url ="http://123.56.135.196:4202/_ds/mcs/capability/satellitegroup";
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function(res){
        $scope.selectshow = [];
        for(var i = 0; i < $scope.name.length; i++){
            $scope.selectshow.push( $scope.name[i].id);
        }
        for(var i = 0; i < res.length; i++){
            if(res[i].level == $scope.x){
                $scope.yc = res[i].Numbers;
            }
        }
        $ionicLoading.hide();

    },function(err){
        console.log("err");
        $ionicLoading.hide();
    });



    //改变value值数据
    $scope.change = function(x){
        if(x != "全部"){
            var url = "http://123.56.135.196:4202/_ds/mcs/capability/satellitegroup";
            var promise = HttpService.getdata(url, $http, $q)
            promise.then(function(res){
                $scope.yc = null;
                $scope.switch = res
                for(var i = 0; i < res.length; i++){
                    if($scope.switch[i].level == x){
                        $scope.yc = $scope.switch[i].Numbers;
                    }
                }
                $ionicLoading.hide();
            },function(err){
                console.log("err")
                $ionicLoading.hide();
            })
        }else{
            var url = "http://123.56.135.196:4202/_ds/mcs/capability/satellite";
            var promise = HttpService.getdata(url, $http, $q)
            promise.then(function(res){
                $scope.yc = null;
                $scope.yc = res;
                $ionicLoading.hide();
            },function(err){
                console.log("err");
                $ionicLoading.hide();
            });
        }

    }

    $scope.news = function(x){
        if(x != "全部"){
            var url = "http://123.56.135.196:4202/_ds/mcs/capability/satellitegroup";
            $http({
                method:"GET",
                url:url
            }).success(function(data){
                $scope.switch = data;
                $scope.yc = null;
                for(var i = 0; i < data.length; i++){
                    if($scope.switch[i].level == x){
                        $scope.yc = $scope.switch[i].Numbers;
                    }
                }
            }).error(function(error){
                console.log("error")
            })
        }else{
            var url = "http://123.56.135.196:4202/_ds/mcs/capability/satellite";
            $http({
                method:"GET",
                url:url
            }).success(function(data){
                $scope.yc = null;
                $scope.yc = data;
            }).error(function(error){
                console.log("error")
            })
        }
        $scope.$broadcast('scroll.refreshComplete');
    }

    //控制颜色
    $scope.newColor = function(state){
        if(state == "正常"){
            return "#5A9055"
        }else if(state == "未知"){
            return "#E8E7E6"
        }else{
            return "#D9534F"
        }
    }

    $scope.gird_height = {height:''+document.getElementById("heightall").offsetHeight+"px"};
    $scope.allhegiht = parseInt($scope.gird_height.height)
    console.log($scope.allhegiht)

    //控制屏幕大小
    if($scope.allhegiht > 0 && $scope.allhegiht <= 480){

        $scope.minPadd = function(size){
            if(size.length == "10"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 10))/size.length) +"px"
                return heights
            }else if(size.length == "7"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 7))/size.length) +"px"
                return heights
            }else if(size.length == "6"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 6))/size.length) +"px"
                return heights
            }else if(size.length == "5"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 5))/size.length) +"px"
                return heights
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "40px"
            }
        }

        $scope.newpadd = function(size){
            if(size.length == 10){
                return "5px"
            }else if(size.length == "7"){
                return "8px"
            }else if(size.length == "6"){
                return "12px"
            }else if(size.length == "5"){
                return "15px"
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "16px"
            }
        }

    }else if($scope.allhegiht > 480 && $scope.allhegiht <= 568){

        $scope.minPadd = function(size){
            if(size.length == "10"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 10))/size.length) +"px"
                return heights
            }else if(size.length == "7"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 7))/size.length) +"px"
                return heights
            }else if(size.length == "6"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 6))/size.length) +"px"
                return heights
            }else if(size.length == "5"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 5))/size.length - 15) +"px"
                return heights
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "40px"
            }
        }

        $scope.newpadd = function(size){
            if(size.length == 10){
                return "9px"
            }else if(size.length == "7"){
                return "12px"
            }else if(size.length == "6"){
                return "16px"
            }else if(size.length == "5"){
                return "20px"
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "16px"
            }
        }


    }else if($scope.allhegiht > 568 && $scope.allhegiht <= 667){
        $scope.minPadd = function(size){
            if(size.length == "10"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 10))/size.length) +"px"
                return heights
            }else if(size.length == "7"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 7))/size.length - 10) +"px"
                return heights
            }else if(size.length == "6"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 6))/size.length - 15) +"px"
                return heights
            }else if(size.length == "5"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 5))/size.length - 25) +"px"
                return heights
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "40px"
            }
        }

        $scope.newpadd = function(size){
            if(size.length == 10){
                return "12px"
            }else if(size.length == "7"){
                return "12px"
            }else if(size.length == "6"){
                return "16px"
            }else if(size.length == "5"){
                return "22px"
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "16px"
            }
        }
    }else if($scope.allhegiht > 667){
        $scope.minPadd = function(size){
            if(size.length == "10"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 10))/size.length) +"px"
                return heights
            }else if(size.length == "7"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 7))/size.length - 10) +"px"
                return heights
            }else if(size.length == "6"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 6))/size.length - 20) +"px"
                return heights
            }else if(size.length == "5"){
                var heights = parseInt(($scope.allhegiht - (137 + size.length * 5))/size.length - 35) +"px"
                return heights
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "40px"
            }
        }

        $scope.newpadd = function(size){
            if(size.length == 10){
                return "15px"
            }else if(size.length == "7"){
                return "20px"
            }else if(size.length == "6"){
                return "25px"
            }else if(size.length == "5"){
                return "30px"
            }else if(size.length == "1"){
                return "20px"
            }else{
                return "16px"
            }
        }
    }




}