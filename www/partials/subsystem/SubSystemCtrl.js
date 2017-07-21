/**
 * Created by qq on 2017/4/18.
 */
angular
    .module('starter.controllers')
    .controller('SubSystemCtrl', SubSystemCtrl)

SubSystemCtrl.$inject = ['$scope', 'Sensors', 'SQLiteService', 'HttpService', 'JPushService',"$http","$interval","$location"];

function SubSystemCtrl($scope, Sensors, SQLiteService, HttpService, JPushService,$http,$interval,$location) {



    $scope.sensors = Sensors.all();

    $scope.systems = {};
    $scope.message = null;

    var _messgeId = 0;

    /*var onReceiveMessage = function (event) {

        //var message;
        if (device.platform == "Android") {
            $scope.message = event.message;
        } else {
            $scope.message = event.content;
        }

        $scope.$apply();//需要手动刷新

        console.log("message : " + $scope.message)
    };*/

    $scope.$on('$ionicView.beforeEnter', function () {

        document.addEventListener("deviceready", updateData, false);
        //document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
        rolldata()
    });


    //滚动视图数据
    function rolldata(){
        //var url = "http://123.56.135.196:4202/_ds/mcs/faultlog/rollistf/undeal";
        var url = "http://123.56.135.196:4202/_ds/mcs/faultlog/rollistf/undeal"
        $http({
            method:"GET",
            url:url
        }).success(function(data){
            $scope.tumble = [];

            if(data.length > 5){
                for(var i = 0; i < 5; i++){
                    $scope.tumble.push(data[i]);
                }
                $scope.long = 5
            }else{
                for(var i = 0; i < data.length; i++){
                    $scope.tumble.push(data[i]);
                }
                $scope.long = data.length;
            }
            $scope.tumblelast = [];
            $scope.tumblelast.push($scope.tumble[0])

            updateSwiper($scope.long)
        }).error(function(error){
            console.log("error")
        })
    }

    //滚动视图
    function updateSwiper(long){
        var oUl = $("#rollplay").find("ul");
        $scope.timer = 0;  //记录定时器
        $scope.iNow = 0;  //记录第几个


        if($scope.oldiNow){
            $scope.iNow = $scope.oldiNow
        }else{
            $scope.iNow = 0
        }

        $scope.timer = $interval(timerInner, 3000);

        function timerInner(){
            $scope.iNow++;
            roll();
        }

        function roll(){
            oUl.animate({top:-32 * $scope.iNow}, function(){
                if($scope.iNow >= long){
                    $scope.iNow = 0;
                    oUl.css("top", 0);
                }
            })
        }
    }

    //切至后台停止定时器
    document.addEventListener("pause", onPause, false);
    function onPause() {
        if($location.path() == "/tab/subsystem") {
            $interval.cancel($scope.timer);
            $scope.oldiNow = $scope.iNow
        }
    }

    //切至前台开始定时器
    document.addEventListener("resume", onResume, false);
    function onResume() {
        if($location.path() == "/tab/subsystem"){
            $scope.oldiNow = $scope.oldiNow
            updateSwiper(5)
        }
    }



    //清除定时器
    $scope.$on("$ionicView.leave", function () {
        $interval.cancel($scope.timer);
        $scope.oldiNow = $scope.iNow
    });




    $scope.tofault = function () {
        window.location.href = "#/tab/faultview";
    }

    function updateData() {

        getdata();
        getSensorStatus();

    }

    function getSensorStatus() {

        var url = CONFIG_GLOBAL.BASEURL + "_ds/mcs/task/stat";
        HttpService.getdata(url).then(function (res) {

            var statuslist = eval(res[0]);
            for (var i = 0; i < $scope.sensors.length; i++) {
                $scope.sensors[i].success = statuslist[$scope.sensors[i].id].success;
                $scope.sensors[i].fail = statuslist[$scope.sensors[i].id].failure;
                $scope.sensors[i].day_plan = statuslist[$scope.sensors[i].id].day_plan;
            }

        }, function (err) {
            console.log("获取仪器状态失败 : " + err);
        });

    }

    function getdata() {

        SQLiteService.get("").then(function (res) {


            var s;
            var ss = new Array();
            for (var i = 0; i < res.rows.length; i++) {

                s = new Object();
                s.id = res.rows.item(i).id;
                s.name = res.rows.item(i).name;
                s.icon = res.rows.item(i).icon;

                ss[i] = s;
            }

            var stateUrl = CONFIG_GLOBAL.BASEURL + "_ds/mcs/faultlog/stat";
            //var url = "http://10.24.4.130:4701/api/ground";
            HttpService.getdata(stateUrl).then(function (res) {

                var rest = eval(res[0]);

                for (var i = 0; i < ss.length; i++) {
                    if (rest[ss[i].id] == null)
                        ss[i].fault = 0;
                    else
                        ss[i].fault = rest[ss[i].id].L1;
                }
            }, function (err) {
                for (var i = 0; i < ss.length; i++) {
                    ss[i].fault = 0;
                }
            });

            $scope.systems = ss;

        }, function (err) {
            alert("GroundSystemCtrl get error");
        });
    };

    $scope.instrument = function (listname) {
        var addname = "#/tab/subsystem/apparatus/" + listname;
        window.location.href = addname;
    }
}

