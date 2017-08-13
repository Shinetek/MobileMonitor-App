/**
 * Created by admin on 2017/7/21.
 */

angular
    .module("starter.controllers")
    .controller("SatewarCtrl",SatewarCtrl);
SatewarCtrl.$inject = ["$scope","$http","$ionicLoading","$ionicPopup"];

function SatewarCtrl($scope,$http,$ionicLoading,$ionicPopup){

    var warname = "mcs"

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
    //下拉刷新数据
    $scope.refreshData = function(){
        showdata()
        $scope.$broadcast('scroll.refreshComplete');
    }


    //获取mcs数据
    function showdata(){
        var url = CONFIG_GLOBAL.BASEURL +"_ds/mcs/faultlog/allistf/" + warname
        $http({
            method:"GET",
            url:url
        }).success(function(res){
            $scope.faults = [];
            for(var i = 0; i < res.length; i++){

                if(res[i].code == "MCSA10006" || res[i].code == "MCSA20016"){
                    res[i].status = updateStatus(res[i].status);
                    $scope.faults.push(res[i])
                }
            }
            if($scope.faults == ""){
                $ionicPopup.alert({
                    title: "提示",
                    template: "未有MCSA10006与MCSA20016报警",
                    okText:"知道了"
                }).then(function(){
                    var addtask = "#/tab/subsystem"
                    window.location.href = addtask;
                })
            }
            $ionicLoading.hide();

        }).error(function(){
            console.log("error");
            $ionicLoading.hide();
        })
    }

    //英文转化
    function updateStatus(status) {
        var text;
        switch (status) {
            case "undeal":
                text = "未处理";
                break;
            case "deal":
                text = "已处理";
                break;
            case "未处理":
                text = "undeal";
                break;
            case "已处理":
                text = "deal";
                break;
        }
        return text;
    }

    //跳转卫星详情界面
    $scope.statedeta = function(id){
        var addid = "#/tab/subsystem/listfault/WXB/" + id;
        window.location.href = addid;
        console.log(addid)
    }


}