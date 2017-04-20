/**
 * Created by qq on 2017/4/20.
 */
anguler
  .module('starter.service')
  .factory('SQLiteService', SQLiteService)

SQLiteService.$inject = ['$q','$cordovaSQLite'];

function SQLiteService($q,$cordovaSQLite){

  var _tablename = null;
  var _db = null;

  // 初始化数据库
  function initDB(tableName){
    var q = $q.defer();

    _tablename = tableName;

    if(!window.cordova) {
      console.log("window.cordova");
      _db = $cordovaSQLite.openDB({name:"my.db" , bgType: 1});
    } else {
      console.log("not window.cordova");
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

}
