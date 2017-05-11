/**
 * Created by admin on 2017/5/9.
 */

(function() {
    "use strict";

    var app = angular.module('starter.controllers');
    app.filter("fourTime", _fourTime);
    function _fourTime() {
        return function(str) {
            if(str.length == 6){
                return str.substring(0,2) + ":" + str.substring(2,4);
            }else if(str.length == 14){
                str = str.substring(8);
                return str.substring(0,2) + ":" + str.substring(2,4) + ":" + str.substring(4,6);
            }
        }
    }
})();