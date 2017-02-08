define(['angular'], function (angular) {
  'use strict';
	/**
	* @ngdoc directive
	* @name oldproApp.directive:angularCompile
	* @description
	* # angularCompile
	*/

	angular.module('oldproApp.directives.AngularCompile', [], ["$compileProvider", function($compileProvider) {
		$compileProvider.directive('angularCompile', ["$compile", function($compile) {
		    return function(scope, element, attrs) {
		        scope.$watch(
		            function(scope) {
		                return scope.$eval(attrs.angularCompile);
		            },
		            function(value) {
		                element.html(value);
		                $compile(element.contents())(scope);
		            }
		        );
		    };
		}])
	}]);
});