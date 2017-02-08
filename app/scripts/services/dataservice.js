define([
	'angular'],
		function (
			angular
	) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name oldproApp.services:DataService
	 * @description
	 * # DataService
	 * Service in the oldproApp.
	 */

	angular.module('oldproApp.services.DataService', [])
	.service('DataService', ["$http", "$q", "$sce", "$rootScope", "$compile", function ($http, $q, $sce, $rootScope, $compile) {

		return {

			// return data promise based on passed url
			getData : function (url, method, data, type) {
				if (!data) {
					data = {};
				}
				if(!type) {
					type = 'json';
				}
				if(!method) {
					method = 'GET';
				}
				var cactusData = $q.defer();
				console.log('url', url);
				var apiData = $http({
					method : method,
					url : url,
					cache : false,
					headers: type
				})
				.success(function (data) {
					return data;
				})
				.error(function (data) {
					return data;
				});

				cactusData.resolve(apiData);
				return cactusData.promise;
			},

			// objects don't return a count
			objectCount : function (bar) {
				var count = 0,
					foo;
				for (foo in bar) {
					if (bar.hasOwnProperty(foo)) {
						count++;
					}
				}
				return count;
			},

			compiler: function(element, template, content, scope) {
                element = $(element); // jshint ignore:line
                template = template[0] + content + template[1];
                var linkFn = $compile(template);
                content = linkFn(scope);

                element.replaceWith(content);
       		},

			trustAsHTML: function(stringToHTML) {
            	return $sce.trustAsHtml(stringToHTML);
       		},

       		gatherHTMLPartials : function(index, id) {
                var r = $rootScope,
                	schedulePath = 'data/schedules/' + id + '.html';

                this.getData(schedulePath,'GET', '', 'html')
                    .then(function (promise) {
                        r.__data.schedules[index].body = promise.data.replace("\n", "");
                    });
            }
		};
	}]);
});