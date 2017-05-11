(function() {
	"use strict";

	var app = angular.module('starter.controllers');

	app.filter("formatTime", _formatTime);

	function _formatTime() {
		return function(str) {
			return str.substring(0,2) + ":" + str.substring(2,4);
		}
	}
})();