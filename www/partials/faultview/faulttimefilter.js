/**
 * Created by admin on 2017/6/5.
 */
(function() {
    "use strict";

    var app = angular.module('starter.controllers');
    app.filter("allTime", _allTime);
    function _allTime() {
        return function(str) {
            var datestring = "";
            datestring += str.substr(0, 4) + "-";
            datestring += str.substr(4, 2) + "-";
            datestring += str.substr(6, 2) + " ";
            datestring += str.substr(8, 2) + ":";
            datestring += str.substr(10, 2) + ":";
            datestring += str.substr(12, 2);

            return datestring;
        }
    }
})();