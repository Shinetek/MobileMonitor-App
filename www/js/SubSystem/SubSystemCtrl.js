/**
 * Created by qq on 2017/4/18.
 */
angular
    .module('starter.controllers')
    .controller('SubSystemCtrl', SubSystemCtrl)

SubSystemCtrl.$inject = ['$scope', 'Sensors', 'SQLiteService', 'HttpService', 'JPushService', '$cordovaLocalNotification'];

function SubSystemCtrl($scope, Sensors, SQLiteService, HttpService, JPushService, $cordovaLocalNotification) {

    $scope.sensors = Sensors.all();

    $scope.systems = {};
    $scope.message = null;

    var _messgeId = 0;


    var onReceiveMessage = function (event) {

        //var message;
        if (device.platform == "Android") {
            $scope.message = event.message;
        } else {
            $scope.message = event.content;
        }

        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime - 1);
        $cordovaLocalNotification.schedule({
            id: "1234",
            at: alarmTime,
            //message: "This is a message",
            title: "This is a title",
            //autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });

        //$cordovaLocalNotification.schedule({
        //    id: 'happi_alert',
        //    date:       new Date() - 1,
        //    message:    "Happi App Message",  // The message that is displayed
        //    title:      "HappiApp Alert",  // The title of the message
        //    sound:      "beep.caf",  // plays `beep.mp3` located in folder
        //    //json:       String,  // Data to be passed through the notification
        //    repeat:     "minutely",
        //    autoCancel: true,
        //}).then(function () {
        //    console.log('callback for adding background notification');
        //});

        $scope.$apply();//需要手动刷新

        console.log("message : " + $scope.message)
    };

    function notification(){
        console.log("notification");
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime - 1);
        $cordovaLocalNotification.schedule({
            id: "1234",
            at: alarmTime,
            //message: "This is a message",
            title: "This is a title",
            //autoCancel: true,
            sound: null
        }).then(function () {
            console.log("The notification has been set");
        });
    }

    $scope.$on('$ionicView.beforeEnter', function () {

        document.addEventListener("deviceready", notification, false);
        document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
        document.addEventListener("jpush.receiveNotification", onReceiveMessage, false);

    });

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
        console.log("addname:" + addname);
        window.location.href = addname;
    }
}

