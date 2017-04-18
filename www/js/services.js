angular.module('starter.services', ['ngCordova'])

  // 远程http请求服务
  .factory('HTTPGET',function(){

    return {
      getdata: function(url, $http, $q){
        var deferred = $q.defer();
        $http({
          method:'Get',
          url:url
        }).success(function(data,staus,headers,config){
          console.log("HTTPGET get data success...");
          console.log(data);
          deferred.resolve(data);
        }).error(function(data,status,headers,config){
          console.log("HTTPGET get data error...");
          //return null;
          deferred.reject(data);
        })

        return deferred.promise;
      }
    }
  })

  .factory('Sensors',function(){
    var sensors = [{
      name:'成像仪',
      icon:'img/accessories-camera-icon.png',
      success:'10',
      fail:'10'
    },{
      name:'探测仪',
      icon:'img/midori-globe-icon.png',
      success:'10',
      fail:'10'
    },{
      name:'闪电仪',
      icon:'img/flash.png',
      success:'10',
      fail:'10'
    }];

    return {
      all: function() {
        return sensors;
      },
      getSensor:function(name){
          for (var i = 0; i < sensors.length; i++) {
            if (sensors[i].name === name) {
              return sensors[i];
            }
          }
          return null;
      }
    };
  })

  .factory('Systems',function(){
    var systems = [{
      id:'DTS',
      name:'数据获取',
      icon:'img/data-download.png',
      selected: false
    },{
      id:'NRS',
      name:'图像定位',
      icon:'img/gps.png',
      selected: false
    },{
      id:'PGS',
      name:'产品生成',
      icon:'img/social_round_product_hunt_149px_1196573_easyicon.net.png',
      selected: false
    },{
      id:'SWS',
      name:'空间天气',
      icon:'img/weather.png',
      selected: false
    },{
      id:'MCS',
      name:'任务管控',
      icon:'img/task.png',
      selected: false
    },{
      id:'DSS',
      name:'数据服务',
      icon:'img/database(1).png',
      selected: false
    },{
      id:'MRS',
      name:'应用示范',
      icon:'img/Application_213px_1194722_easyicon.net.png',
      selected: false
    },{
      id:'CVS',
      name:'定标检验',
      icon:'img/check_128px_1180491_easyicon.net.png',
      selected: false
    },{
      id:'CNS',
      name:'计算机网络',
      icon:'img/network.png',
      selected: false
    }];

    return {
      all: function() {
        return systems;
      }
    };
  })

  .factory('Stations',function(){
      var stations = [{
      title :'北京',
      name:'tab-station',
      icon:'icon ion-ios-location',
      iconOFF:'icon ion-ios-location',
      to:'#/tab/station'
    }, {
      title :'广州',
      name:'tab-station',
      icon:'icon ion-ios-location',
      iconOFF:'icon ion-ios-location',
      to:'#/tab/station'
    }, {
      title :'乌鲁木齐',
      name:'tab-station',
      icon:'icon ion-ios-location',
      iconOFF:'icon ion-ios-location',
      to:'#/tab/station'
    }, {
      title :'佳木斯',
      name:'tab-station',
      icon:'icon ion-ios-location',
      iconOFF:'icon ion-ios-location',
      to:'#/tab/station'
    }];

    return {
      all: function() {
        return stations;
      }
    };
  })
  //.factory('AttentionService', ["$q",function ($q) {

  .factory('SQLiteService', ["$q","$cordovaSQLite",function($q,$cordovaSQLite){

    var _tablename = null;
    var _db = null;

    // 初始化数据库
    function initDB(tableName){
      var q = $q.defer();

      _tablename = tableName;

      if(!window.cordova) {
        alert("window.cordova");
        _db = $cordovaSQLite.openDB({name:"my.db" , bgType: 1});
      } else {
        _db = window.openDatabase("my.db" , '1', 'ES Database', 5 * 1024 * 1024);
      }

      $cordovaSQLite.execute(_db, "CREATE TABLE IF NOT EXISTS "+ _tablename +" (id text primary key, name text, icon text)").then(function(res){
        q.resolve(res);
      }, function(err){
        q.reject(err);
      });

      return q.promise;
    }

    // 插入单条记录
    function insertData(id, name, icon){

      var q = $q.defer();

      var qInsert = "INSERT INTO "+ _tablename +" (id, name, icon) VALUES (?, ?, ?)";    //SQL

      //三个参数，分别是数据库名，执行的sql语句，和待填入sql语句中对应位置的参数。后面是执行完毕的回调函数，res是返回的对象
      $cordovaSQLite.execute(_db, qInsert, [id, name, icon]).then(function(res) {
        q.resolve(res);
      }, function (err) {
        q.reject(err);
      });

      return q.promise;
    }

    function insertDataList(systems){
      for(var i = 0;i<systems.length;i++){

      }
    }

    // 删除单条数据
    function deleteData(id){
      var q = $q.defer();

      var qDelete = null;
      if(id == "")
        qDelete = "DELETE FROM "+_tablename+" WHERE id != ?";
      else
        qDelete = "DELETE FROM "+_tablename+" WHERE id = ?";

      $cordovaSQLite.execute(_db,qDelete,[id]).then(function(res){
        q.resolve(res);
      },function(err){
        q.reject(err);
      })

      return q.promise;
    }

    // 获取数据
    function getAllData(id){

      var q = $q.defer();

      var qSelect = null;
      if(id == "")
        qSelect = "SELECT * FROM " + _tablename + " WHERE id != ?";
      else
        qSelect = "SELECT * FROM " + _tablename + " WHERE id = ?";

      $cordovaSQLite.execute(_db, qSelect, [id]).then(function(res) {
        q.resolve(res);
      }, function(err){
        q.reject(err);
      })

      return q.promise;
    }

    return{
      init: initDB,
      insert: insertData,
      delete: deleteData,
      get: getAllData
    };
  }]);


