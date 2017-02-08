/*jshint unused: vars */
require.config({
	paths: {
		angular: '../../bower_components/angular/angular',
		'angular-resource': '../../bower_components/angular-resource/angular-resource',
		jquery: '../../bower_components/jquery/dist/jquery',
		'jquery.cookie': '../../bower_components/jquery.cookie/jquery.cookie',
		'jquery.waituntilexists': 'ext/jquery.waituntilexists',
		'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
		'jquery.scrollTo': '../../bower_components/jquery.scrollTo/jquery.scrollTo',
		'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
		'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
		'ev-emitter': '../../bower_components/ev-emitter/ev-emitter',
		foundation: '../../bower_components/foundation/js/foundation'
	},
	shim: {
		angular: {
			exports: 'angular',
			deps: [
				'jquery'
			]
		},
		'angular-resource': [
			'angular'
		],
		'angular-sanitize': [
			'angular'
		],
		'angular-ui-router': {
			deps: [
				'angular'
			]
		},
		'angular-mocks': {
			exports: 'angular.mock',
			deps: [
				'angular'
			]
		},
		'jquery.cookie': [
			'jquery'
		],
		'jquery.scrollTo': [
			'jquery'
		],
		'jquery.waituntilexists': [
			'jquery'
		],
		foundation: [
			'jquery'
		]
	},
	priority: [
		'angular'
	],
	packages: [

	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = 'NG_DEFER_BOOTSTRAP!';

require([
	'angular',
	'app',
	'angular-ui-router',
	'angular-resource',
	], function(angular, app, uiRouter, ngResource) {
	'use strict';
	/* jshint ignore:start */
	var $html = angular.element(document.getElementsByTagName('html')[0]);
	/* jshint ignore:end */
	angular.element().ready(function() {
		angular.resumeBootstrap([app.name]);
	});

});
