/*jshint unused: vars */
define(
	/* call dependency paths */
	[
		//ngServices
		'angular',
		'angular-sanitize',
		//3rd-party modules
		'angular-ui-router',
		//App services
		'services/animations',
		'services/concierge',
		'services/dataservice',
		'services/location',
		'services/preloader',
		'services/runners',
		'services/states',
		//App directives
		'directives/angularcompile'],

	/* pass dependencies with shortname */
	function (
		//ngServices
		angular,
		ngSanitize,
		//3rd-party modules
		uiRouter,
		//App services
		AnimationsService,
		ConciergeService,
		DataService,
		LocationService,
		PreloaderFactory,
		RunnerService,
		StatesService,
		//App directives
		AngularCompileDirective) {
	'use strict';

	/* name module, and inject dependencies */
	return angular
		.module('oldproApp', [
		//ngServices
		'ngResource',
		'ngSanitize',
		//3rd-party modules
		'ui.router',
		//App services
		'oldproApp.services.Animations',
		'oldproApp.services.ConciergeService',
		'oldproApp.services.DataService',
		'oldproApp.services.LocationService',
		'oldproApp.services.PreloaderFactory',
		'oldproApp.services.RunnerService',
		'oldproApp.services.StatesService',
		//App directives
		'oldproApp.directives.AngularCompile'
	])
	.config(function($stateProvider, $urlRouterProvider) {
	  // For any unmatched url, redirect to landing
	  $urlRouterProvider.otherwise("/");

	  // Now set up the states
	  $stateProvider
	    .state('guide', {
	      url: "/guide",
	      templateUrl: "views/guide.html"
	    })
	    .state('contact', {
	      url: "/contact",
	      templateUrl: "views/contact.html"
	    })
	    .state('landing', {
	      url: "/",
	      templateUrl: "views/landing.html"
	    });
	})
	.run(function(ConciergeService) {
		ConciergeService.init();
	});
});