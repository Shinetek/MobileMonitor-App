/**
 * Created by qq on 2017/4/18.
 */
angular
  .module('starter.controllers')
  .controller('SubSystemCtrl',SubSystemCtrl)

SubSystemCtrl.$inject = ['$scope', 'Sensors', 'SQLiteService', 'HttpService', 'JPushService'];

function SubSystemCtrl($scope, Sensors, SQLiteService, HttpService, JPushService){

  $scope.sensors = Sensors.all();

  $scope.systems = {};
  $scope.message = null;
  $scope.loopcount = 2;
  $scope.visible = false;

  var onReceiveMessage = function (event) {

    //var message;
    if (device.platform == "Android") {
      $scope.message = event.message;
    } else {
      $scope.message = event.content;
    }

    $scope.loopcount = 1;

    $scope.$apply();//需要手动刷新

    console.log("message : " + $scope.message)
  };

  $scope.$on('$ionicView.beforeEnter', function() {

    document.addEventListener("deviceready",getdata,false);
    document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);

  });

  function getdata(){

    SQLiteService.get("").then(function(res){

      var s;
      var ss = new Array();
      for(var i = 0;i<res.rows.length;i++){

        s = new Object();
        s.id = res.rows.item(i).id;
        s.name = res.rows.item(i).name;
        s.icon = res.rows.item(i).icon;

        ss[i] = s;
      }

      var stateUrl = CONFIG_GLOBAL.BASEURL + "_ds/mcs/faultlog/stat";
      //var url = "http://10.24.4.130:4701/api/ground";
      HttpService.getdata(stateUrl).then(function(res){

        var rest = eval(res[0]);

        for(var i = 0;i < ss.length;i++){
          if(rest[ss[i].id] == null)
              ss[i].fault = 0;
          else
              ss[i].fault = rest[ss[i].id].L1;
        }
      }, function(err){
        for(var i = 0;i < ss.length;i++){
          ss[i].fault = 0;
        }
      });

      $scope.systems = ss;

    }, function (err) {
      alert("GroundSystemCtrl get error");
    });
  };

  $scope.instrument = function(listname){
    var addname = "#/tab/subsystem/apparatus/" + listname;
    console.log("addname:" + addname);
    window.location.href = addname;
  }
}

