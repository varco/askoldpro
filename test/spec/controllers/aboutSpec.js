/*jshint unused: vars */

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
	'use strict';

	describe('Controller: AboutCtrl', function () {

		var AboutCtrl;

		//mock Application to allow us to inject our own dependencies
		beforeEach(angular.mock.module('oslerApp.controllers.AboutCtrl'));

		//mock the controller for the same reason and include $rootScope and $controller
		beforeEach(angular.mock.inject(function($rootScope, $controller) {
			//create an empty scope
			AboutCtrl = $rootScope.$new();
			//declare the controller and inject our empty scope
			$controller('AboutCtrl', {$scope: AboutCtrl});
		}));

		// tests start here
		it('scope should be empty', function () {
			expect(AboutCtrl.length).toBe(undefined);
		});

		it('should have variable text = "Hello World!"', function(){
			expect(AboutCtrl.text).toBe('Hello World!');
		});

	});
});
