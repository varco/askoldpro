define([
		//dependency path (same shortname as given in requires main.js)
		'angular'], function (
			//pass required dependencies
			angular
			) {
	'use strict';

	/**
	 * @ngdoc function
	 * @name oldproApp.controller:GuideController
	 * @description
	 * # GuideController
	 * Controller of the oldproApp
	 */
	angular.
	module('oldproApp.controllers.GuideController', []).
		controller('GuideController', [
			//inject
			'$rootScope', function (
				//invoke
				$rootScope
			) {

			var r = $rootScope;

			r.$emit('progressBarUpdate');

	 }]);
});
