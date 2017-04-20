/**
 * Created by qq on 2017/4/20.
 */
angular
  .module('starter.services')
  .factory('HttpSerivce', HttpSerivce)

HttpSerivce.$inject = ['$http','$q'];

function HttpSerivce($http,$q){
  return {
    getdata: function(url){
      var deferred = $q.defer();
      $http({
        method:'Get',
        url:url
      }).success(function(data,staus,headers,config){
        console.log("Success Get Data : " + url);
        deferred.resolve(data);
      }).error(function(data,status,headers,config){
        console.log("Fail Get Data!");
        deferred.reject(data);
      })

      return deferred.promise;
    }
  }
}
