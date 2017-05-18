/**
 * Created by admin on 2017/5/18.
 */
(function() {
    "use strict";

    var app = angular.module('starter.controllers');

    app.filter("taskname", _taskname);

    function _taskname() {
        return function(str) {
            var name = str.substring(0,3);
            if(name == "AFN"){
                name = "全圆盘常规观测"
            }else if(name == "ABS" || name == "GBS"){
                name = "黑体观测"
            }else if(name == "ASS" || name == "GSS"){
                name = "恒星观测"
            }else if(name == "GPS"){
                name = "冷星观测"
            }else if(name == "GLS" || name == "LMV"){
                name = "地标观测"
            }else if(name == "GRS"){
                name = "区域观测"
            }else if(name = "LLV"){
                name = "常规观测"
            }
            var time = str.substring(11,15);
            var times = time.substring(0,2) + ":" + time.substring(2,4);
            return name + " " + times
        }
    }

})();