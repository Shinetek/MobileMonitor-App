/**
 * Created by admin on 2017/6/12.
 */

(function() {
    "use strict";

    var app = angular.module('starter.controllers');
    app.filter("rollTime", _rollTime);
    function _rollTime() {
        return function(str) {
            var time = str.substring(4)
            time.substring(0,2)
            return time.substring(0,2)+"月"+ time.substring(2,4) + "日-"
                + time.substring(4,6)+":"+ time.substring(6,8)+":"+ time.substring(8,10)
        }
    }
})();