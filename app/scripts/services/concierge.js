define([
	'angular',
	'jquery',],
		function (
			angular,
			jQuery
	) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name oldproApp.services:ConciergesService
	 * @description
	 * # ConciergesService
	 * Service in the oldproApp.
	 */

	angular.module('oldproApp.services.ConciergeService', [])
	.service('ConciergeService', [
			"$rootScope",
			"$state",
			"DataService",
			"StatesService",
			"LocationService",
			"RunnerService",
			"preloader",
			"Animations",
		function (
			$rootScope,
			$state,
			DataService,
			StatesService,
			LocationService,
			RunnerService,
			preloader,
			Animations) {

		var r = $rootScope;

		return {

			preloader : function() {
				$rootScope.imageLocations = [
					"images/stock-red.jpg",
					"images/radio-off.svg",
					"images/radio-on.svg",
					"images/radio-hover.svg",
					"images/arrow-left-alt-white.svg",
					"images/arrow-right-white.svg"
				];

				preloader.preloadImages( $rootScope.imageLocations )
				.then(function() {
				    // Loading was successful.
				    jQuery('body').addClass('loaded');
				    jQuery('#loader-wrapper').delay(300).hide(1000);
				},
				function() {
				    console.log('Loading failed on at least one image');
				});

			},

			servicesStartup : function() {
				r.__services = {
					"_data" : DataService,
					"_location" : LocationService,
					"_state" : StatesService,
					"_animation" : Animations,
					"_runner" : RunnerService
				};
			},

			listen : function() {
				r.$on('$stateChangeSuccess', function(event, toState) {
					$rootScope.__state.location = toState.name;
				});
			},

			init : function () {
				this.servicesStartup();
				this.preloader();
				$rootScope.__services._runner.dataStartup();
				$rootScope.__services._runner.dataBuild();
				this.listen();
			}

		};

	}]);
});
