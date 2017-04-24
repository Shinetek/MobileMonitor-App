/**
 * Created by qq on 2017/4/18.
 */
angular
  .module('starter.controllers')
  .controller('SubSystemCtrl',SubSystemCtrl)

SubSystemCtrl.$inject = ['$scope', 'Sensors', 'SQLiteService'];

function SubSystemCtrl($scope, Sensors, SQLiteService){

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

      $scope.systems = ss;

    }, function (err) {
      alert("GroundSystemCtrl get error");
    });
  };
}

