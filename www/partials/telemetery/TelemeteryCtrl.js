/**
 * Created by admin on 2017/6/2.
 */

angular
    .module("starter.controllers")
    .controller("TelemeteryCtrl",TelemeteryCtrl);
TelemeteryCtrl.$inject = ["$scope","$http","$ionicLoading", "$q", "HttpService"];

function TelemeteryCtrl($scope, $http,$ionicLoading, $q, HttpService){

    //延迟加载
    /*$ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellitegroup";

    var promise = HttpService.getdata(url, $http, $q)
        promise.then(function(res){
            $scope.switch = res;
            console.log( $scope.switch[0].level);
            console.log( $scope.switch);
            $ionicLoading.hide();

            //设置select下拉选项第一个不为空白效果
            $scope.x = $scope.switch[0].level;

            //初始效果数据
            $scope.yc = $scope.switch[0];


        },function(err){
            console.log("err");
            $ionicLoading.hide();
        });




    //改变value值数据
    $scope.change = function(x){
        for(var i = 0; i < $scope.switch.length; i++){
            if($scope.switch[i].level == x){
                $scope.yc = $scope.switch[i];
            }
        }
    }

    $scope.news = function(x){
        var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellitegroup";


        var promise = HttpService.getdata(url, $http, $q)
        promise.then(function(res){
            $scope.switch = res;

            for(var i = 0; i < $scope.switch.length; i++){
                if($scope.switch[i].level == x){
                    $scope.yc = $scope.switch[i];
                }
            }
            $scope.$broadcast('scroll.refreshComplete');
        });
     }*/

    $ionicLoading.show({
        content: "Loading",
        animation: "fade-in",
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
    });

    var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellite";
    var promise = HttpService.getdata(url, $http, $q);
    promise.then(function(res){
        $scope.switch = res;
        $scope.selected = [];
        $scope.selectshow = [];
        for(var i = 0; i < res.length; i++){
            $scope.selected.push(res[i].level);
        }
        for(var i = 0; i < $scope.selected.length; i++){
            if($scope.selectshow.indexOf($scope.selected[i]) == -1){
                $scope.selectshow.push($scope.selected[i]);
            }
        }

        $ionicLoading.hide();

        //设置select下拉选项第一个不为空白效果
        $scope.x = "全部";

        //初始效果数据
        $scope.yc = $scope.switch;

    },function(err){
        console.log("err");
        $ionicLoading.hide();
    });


    //改变value值数据
    $scope.change = function(x){
        if(x != "全部"){
            var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellitegroup";
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
            var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellite";
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
            var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellitegroup";
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
            var url = "http://10.24.4.130:4701//_ds/mcs/capability/satellite";
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
        }else{
            return "#D9534F"
        }
    }


}