/**
 * Created by qq on 2017/4/18.
 */
angular
  .module('starter.controllers')
  .controller('SubSystemCtrl',SubSystemCtrl)

SubSystemCtrl.$inject = ['$scope', 'Sensors', 'SQLiteService', 'HttpService'];

function SubSystemCtrl($scope, Sensors, SQLiteService, HttpService){

  $scope.sensors = Sensors.all();

  $scope.systems = {};

  $scope.loadself = function(){
    //alert("view OnLoad.");
    document.addEventListener("deviceready",getdata,false);
  };

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.loadself();//局部刷新，更新所需的字段
    //这里只需要将需要的字段重新赋值就OK了
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

      var url = "http://10.24.4.130:4701/api/ground";
      HttpService.getdata(url).then(function(res){
        //console.log(res.length);
        //console.log(ss.length);
        //console.log("onefault : " + res[0].status.onefault);
        for(var i = 0;i < ss.length;i++){
          for(var j = 0;j < res.length;j++){
            if(res[j].name == ss[i].id){
              //console.log(res[j].status.onefault);
              ss[i].fault = res[j].status.onefault;
              break;
            }
          }
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
    var addname = "#/tab/apparatus/" + listname;
    //alert("addname:" + addname);
    window.location.href = addname;
  }
}

