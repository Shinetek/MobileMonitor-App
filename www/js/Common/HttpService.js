/**
 * Created by qq on 2017/4/20.
 */
angular
  .module('starter.services')
  .factory('HttpService', HttpService)

HttpService.$inject = ['$http', '$q'];

function HttpService($http, $q){
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
        console.log("Fail Get Data!" + url);
        deferred.reject(data);
      })

      return deferred.promise;
    }
  };
}
