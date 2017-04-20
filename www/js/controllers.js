

angular.module('starter.controllers', [])

  //.controller('GroundSystemCtrl',function($scope, Systems, Sensors, SQLiteService, $ionicLoading){
  //  //if(SQLiteService.get("") != null)
  //  //  $scope.sensors = SQLiteService.get("");
  //  $scope.sensors = Sensors.all();
  //  $scope.currsensors = Sensors.all() ;
  //
  //  $scope.systems = {};
  //
  //  $scope.$on('$ionicView.afterEnter', function() {
  //
  //    document.addEventListener("deviceready",getdata,false);
  //
  //  });
  //
  //  function getdata(){
  //
  //    $ionicLoading.show({
  //      content: 'Loading',
  //      animation: 'fade-in',
  //      showBackdrop: true,
  //      maxWidth: 200,
  //      showDelay: 0
  //    });
  //
  //    SQLiteService.get("").then(function(res){
  //
  //      //alert("初始显示数据个数 : " + res.rows.length)
  //
  //      var s;
  //      var ss = new Array();
  //      for(var i = 0;i<res.rows.length;i++){
  //
  //        s = new Object();
  //        s.id = res.rows.item(i).id;
  //        s.name = res.rows.item(i).name;
  //        s.icon = res.rows.item(i).icon;
  //
  //        ss[i] = s;
  //      }
  //
  //      $scope.systems = ss;
  //
  //      $ionicLoading.hide();
  //
  //    }, function (err) {
  //      alert("GroundSystemCtrl get error");
  //      $ionicLoading.hide();
  //
  //    });
  //
  //  };
  //
  //})
  //
  //.controller('SystemCustomCtrl', function($scope, Systems, SQLiteService){
  //  //$scope.systems = Systems.all();
  //  var systemlist = Systems.all();
  //
  //  SQLiteService.get("").then(function(res){
  //
  //    //alert("res.rows.length : " + res.rows.length)
  //    for(var i = 0;i<res.rows.length;i++){
  //      //alert("name : " + systemlist[j].name + ", selected : " + systemlist[j].selected);
  //
  //      for(var j = 0;j<systemlist.length;j++){
  //
  //        if(systemlist[j].name == res.rows.item(i).name){
  //          //alert("name : " + systemlist[j].name + ", selected : " + systemlist[j].selected);
  //
  //          systemlist[j].selected = true;
  //        }
  //      }
  //    }
  //
  //    $scope.systems = systemlist;
  //
  //
  //  }, function (err) {
  //    alert("SystemCustomCtrl get error");
  //  });
  //
  //  $scope.selectedChanged = function(name,$event){
  //    var checkbox = $event.target;
  //    //alert("name : " + name + ", checkState : " + checkbox.checked);
  //    for(var i = 0;i<$scope.systems.length;i++){
  //      if($scope.systems[i].name == name){
  //        $scope.systems[i].selected = checkbox.checked;
  //        //alert("name : " + $scope.systems[i].name + ", selected : " + $scope.systems[i].selected);
  //      }
  //    }
  //  }
  //
  //  // 更新数据库中的数据
  //  function UpdateDataBase(){
  //    SQLiteService.delete("").then(function(res){
  //
  //      // 先清空数据库在插入新数据
  //      for(var i = 0;i<$scope.systems.length;i++) {
  //        if($scope.systems[i].selected == true){
  //          //alert($scope.systems[i].name + " " + $scope.systems[i].selected);
  //          SQLiteService.insert($scope.systems[i].id,$scope.systems[i].name,$scope.systems[i].icon).then(function(){
  //            //alert("插入数据" + $scope.systems[i].id);
  //          });
  //        }
  //      }
  //    }, function(err){
  //      alert("删除数据错误！");
  //    });
  //  }
  //
  //  $scope.saveChanged = function(){
  //    UpdateDataBase();
  //  }
  //
  //  //document.addEventListener("deviceready", function () {
  //  //  var ss = Systems.all();
  //  //  SQLiteService.get("").then(function(res){
  //  //
  //  //    for(var i = 0;i<res.rows.length;i++){
  //  //      for(var j = 0;j<ss.length;j++){
  //  //        if(ss[j].name == res.rows.item(i).name){
  //  //          ss[j].selected = true;
  //  //        }
  //  //      }
  //  //    }
  //  //
  //  //    $scope.systems = ss;
  //  //
  //  //  }, function (err) {
  //  //    alert("SystemCustomCtrl get error");
  //  //  });
  //  //},false);
  //
  //})
  //
  //.controller('FastViewDetailCtrl', function($scope, $stateParams, $http, $q, $ionicLoading,  HttpService) {
  //  $scope.instrumentName = $stateParams.instname;
  //  $scope.updateTimeString = function(datetimeString){
  //    var strs= new Array(); //定义一数组
  //    strs= datetimeString.split(" ");
  //    return strs[1]
  //  }
  //  $scope.updateBackground = function(state){
  //    if(state == 'done')
  //    {
  //      return "DarkGreen";
  //    }
  //    else if(state == 'error')
  //    {
  //      return "#e45050";
  //    }
  //    else if(state == 'warn')
  //    {
  //      return "#ddb411";
  //    }
  //    else
  //    {
  //      return "Gray";
  //    }
  //  }
  //  $scope.getImageData = function(){
  //    $http({
  //      method:'Get',
  //      url:'http://10.24.4.139:8080/fy3d/api/basedataserver/l1image/single/mersi2/20170328/0000/d/a/0000&ch01&20'
  //    }).success(function(data,staus,headers,config){
  //      console.log("get image success...");
  //      console.log(data);
  //      //$scope.orbitModels = data;
  //    }).error(function(data,status,headers,config){
  //      console.log("get image error...");
  //    })
  //  }
  //
  //  $scope.init = function() {
  //    var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/collect/l0static/20170320/' + $stateParams.instname + '/dpt/ad/r';
  //    var promise = HttpService.getdata(url, $http, $q);
  //    promise.then(function (res) {
  //      $scope.orbitModels = res;
  //    })
  //
  //    $scope.$broadcast('scroll.refreshComplete');
  //  }
  //
  //  $ionicLoading.show({
  //    content: 'Loading',
  //    animation: 'fade-in',
  //    showBackdrop: true,
  //    maxWidth: 200,
  //    showDelay: 0
  //  });
  //
  //  var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/collect/l0static/20170320/' + $stateParams.instname + '/dpt/ad/r';
  //  var promise = HttpService.getdata(url, $http, $q);
  //  promise.then(function (res) {
  //    $scope.orbitModels = res;
  //    $ionicLoading.hide();
  //  })
  //
  //})
  //
  //.controller('FastViewCtrl',function($scope, $http, $q, $ionicLoading, HttpService){
  //
  //  $ionicLoading.show({
  //    content: 'Loading',
  //    animation: 'fade-in',
  //    showBackdrop: true,
  //    maxWidth: 200,
  //    showDelay: 0
  //  });
  //
  //  var url = 'http://10.24.4.139:8080/fy3d/api/l1monitor/instlistconfig';
  //  var promise = HttpService.getdata(url,$http, $q)
  //  promise.then(function (res) {
  //    $scope.jsonData = res;
  //    $ionicLoading.hide();
  //  },function(err){
  //    alert("shibai");
  //  })
  //
  //  $scope.updateFileList = function(instname){
  //    var addr = "#/tab/fastView/"+instname;
  //    console.log("addr : " + addr);
  //    window.location.href=addr;
  //  }
  //});
