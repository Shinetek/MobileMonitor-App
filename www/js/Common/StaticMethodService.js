/**
 * Created by qq on 2017/5/3.
 */
angular
    .module('starter.services')
    .factory('StaticMethodService', StaticMethodService)

StaticMethodService.$inject = ['$http', '$q'];

function StaticMethodService($http, $q){
    return {
        // 时间转换成长字符串
        formatLongDatTime: function(longdatetime){
            var datestring = "";
            datestring += longdatetime.substr(0, 4) + "-";
            datestring += longdatetime.substr(4, 2) + "-";
            datestring += longdatetime.substr(6, 2) + " ";
            datestring += longdatetime.substr(8, 2) + ":";
            datestring += longdatetime.substr(10, 2) + ":";
            datestring += longdatetime.substr(12, 2);

            return datestring;
        }
    };
}