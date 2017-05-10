/**
 * Created by admin on 2017/5/9.
 */
(function() {
    "use strict";

    var app = angular.module('starter.controllers');

    app.filter("names", _name);

    function _name() {
        return function(str) {
            return str.substring(0,2);
        }
    }
})();