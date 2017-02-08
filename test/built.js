/*jshint unused: vars */
define(
	/* call dependency paths */
	[
		'angular',
		'angular-sanitize',
		'angular-ui-router',
		'services/dataservice',
		'services/animations',
		'controllers/guide',
		'controllers/about',
		'controllers/container',
		'controllers/stop',
		'directives/progressbar',
		'directives/angularcompile',
		'directives/schedules'],

	/* pass dependencies with shortname */
	function (
		angular,
		ngSanitize,
		DataService,
		uiRouter,
		AnimationsService,
		SurveyController,
		AboutCtrl,
		ContainerCtrl,
		StopCtrl,
		ProgressBarDirective,
		ModalDirective,
		AngularCompileDirective,
		SchedulesDirective) {
	'use strict';

	/* name module, and inject dependencies */
	return angular
		.module('oslerApp', [
		'oslerApp.controllers.SurveyController',
		'oslerApp.controllers.AboutCtrl',
		'oslerApp.controllers.ContainerCtrl',
		'oslerApp.controllers.StopCtrl',
		'oslerApp.services.DataService',
		'oslerApp.services.Animations',
		'oslerApp.directives.ProgressBar',
		'oslerApp.directives.AngularCompile',
		'oslerApp.directives.Schedules',
		'ngResource',
		'ngSanitize',
		'ui.router'
	])
	.config(function($stateProvider, $urlRouterProvider) {
	  // For any unmatched url, redirect to landing
	  $urlRouterProvider.otherwise("/");

	  // Now set up the states
	  $stateProvider
	    .state('guide', {
	      url: "/guide",
	      templateUrl: "views/guide.html",
	      controller: 'SurveyController as main'
	    })
	    .state('stop', {
	      url: "/stop",
	      templateUrl: "views/stop.html",
	      controller: 'StopCtrl as stop'
	    })
	    .state('landing', {
	      url: "/",
	      templateUrl: "views/landing.html",
	      controller: 'AboutCtrl as about'
	    });
	});
});
define(['angular'], function (angular) {
  'use strict';

  /**
   * @ngdoc function
   * @name oslerApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the oslerApp
   */
  angular.module('oslerApp.controllers.AboutCtrl', [])
    .controller('AboutCtrl', ['$scope' , function ($scope) {
      $scope.text = 'Hello World!';
    }]);
});

define([
        //dependency path (same shortname as given in requires main.js)
        'angular',
        'services/dataservice'], function (
            //pass required dependencies
            angular,
            dataService // jshint ignore:line
            ) {
    'use strict';

    /**
     * @ngdoc function
     * @name oslerApp.controller:ContainerCtrl
     * @description
     * # ContainerCtrl
     * Controller of the oslerApp
     */
    angular.module('oslerApp.controllers.ContainerCtrl', [])
        .controller('ContainerCtrl', [
                '$scope',
                '$rootScope',
                '$state',
                '$sce',
                    function(
                        $scope,
                        $rootScope,
                        $state,
                        $sce) {

                if ($state) {
                    $state.go('landing');
                }

                console.log($state);

                var t = this,
                    d = new Date();
                    t.year = d.getFullYear();
                    t.stopText = '';

                $rootScope.$on('stopText', function(event, data) {
                    t.stopText = data;
                    $state.go('stop');
                });

                $rootScope.$on('$stateChangeStart',
                    function(event, toState) {
                    t.state = toState.name;
                });

                t._goToStop = (function(){
                    $scope.$emit('stopText', '');
                });

                t._trustAsHTML = (function(stringToHTML) {
                    return $sce.trustAsHtml(stringToHTML);
                });

        }]);
});

define([
		//dependency path (same shortname as given in requires main.js)
		'angular',
		'services/dataservice',
		'services/animations'], function (
			//pass required dependencies
			angular,
			dataService, // jshint ignore:line
			aniService // jshint ignore:line
			) {
	'use strict';

	/**
	 * @ngdoc function
	 * @name oslerApp.controller:SurveyController
	 * @description
	 * # SurveyController
	 * Controller of the oslerApp
	 */
	angular.
	module('oslerApp.controllers.SurveyController', []).
		controller('SurveyController', [
			//inject
			'$scope',
			'$rootScope',
			'$http',
			'$timeout',
			'$location',
			'DataService',
			'Animations', function (
				//invoke
				$scope,
				$rootScope,
				$http,
				$timeout,
				$location,
				dataService,
				animationsService
			) {

			var t = this;

			$rootScope.$on('keypress', function (e, a, key) {
			    $scope.$apply(function () {
			        $scope.key = key;
			    });
			});

			// Retrieve JSON data object, name it 'steps', and set the stage
			dataService.getData('../data/steps.json','GET').
				then(function (promise) {
					t.steps = promise.data[0];
					t._buildoutStepsObject(t.steps);
					t.current = [1,1];
					t._locationUpdate([1,1]);
				});

			// Insert progress tracking (active, visible, completed) into Steps and Questions
			t._buildoutStepsObject = (function (stepsObject) {
				var t = this,
				i,
				j;

				t.stepControlObject = {};
				t.visibleStepObject = {};

				for (i = 1; i <= dataService.objectCount(stepsObject); i++) {
					t.stepControlObject[i] = {
							'active' : false,
							'completed' : false,
							'visible' : false,
							'classes' : {
								'previous' : false,
								'current' : false,
								'next' : false
							}
						};

					t.stepControlObject[i].questions = {};

					for (j = 1; j <= dataService.objectCount(stepsObject[i].questions); j++) {
						t.stepControlObject[i].questions[j] = {
							'active' : false,
							'completed' : false,
							'visible' : false
						};
					}
				}
			});

			t._locationUpdate = (function locationUpdate(locationArr, action) {

				var t = this,
					resetActiveState,
					updateCompletedStep,
					updateCurrentLocationScope,
					updateActiveState,
					animate,
					location,
					i,
					j;

				t.steps = $scope.main.steps;
				t.stepControlObject = $scope.main.stepControlObject;

				if(locationArr[0] === 0) {

					t.stop = t.steps[t.current.step].questions[t.current.question][action].stop;
					$rootScope.$emit('stopText', t.stop);

				} else {

					resetActiveState = function () {
						for (i = 1; i <= dataService.objectCount(t.stepControlObject); i++) {
							t.stepControlObject[i].active = false;
							for (j = 1; j <= dataService.objectCount(t.stepControlObject[i].questions); j++) {
								t.stepControlObject[i].questions[j].active = false;
							}
						}
					};

					updateCompletedStep = function () {
						if(t.current) {
							if(locationArr[0] > 1 && t.stepControlObject[t.current.step]) {
								t.stepControlObject[t.current.step].completed = true;
							}
						}
					};

					updateCurrentLocationScope = function () {
						t.current = locationArr;
						t.current.step = locationArr[0],
						t.current.question = (locationArr[1]?locationArr[1]:0);
					};

					updateActiveState = function () {
						t.stepControlObject[t.current.step].visible = true;
						t.stepControlObject[t.current.step].active = true;
						t.stepControlObject[t.current.step].questions[t.current.question].active = true;
						t.stepControlObject[t.current.step].questions[t.current.question].visible = true;
					};


					animate = function () {
						location = "#step_" + t.current[0] + "_question_" + t.current[1];
						animationsService.scrollTo(location, t.current[1]);
						animationsService.growLine(location, t.current[0]);
					};

					resetActiveState(),
					updateCompletedStep(),
					updateCurrentLocationScope(),
					updateActiveState(),
					animate();
					dataService.spanReplace(t.current[0], t.current[1]);

					$scope.main._filterVisibleSteps(t.stepControlObject);
					$scope.main._applyClasses(t.current.step);
					$scope.$emit('mainEvent', $scope.main);
				}

			});

			t._applyClasses = (function (index) {
				for (var i = 1; i <= dataService.objectCount(t.stepControlObject); i++) {
					t.stepControlObject[i].classes.previous =
						t.stepControlObject[i].classes.next =
							t.stepControlObject[i].classes.current = false;

					if(i < index) {
						t.stepControlObject[i].classes.previous = true;
					} else if(i > index) {
						t.stepControlObject[i].classes.next = true;
					} else {
						t.stepControlObject[i].classes.current = true;
					}
				}
			});

			t._filterVisibleSteps = ( function(items) {
		        var t = this,
		        	i = 1;

		        angular.forEach(items, function(value, key) {
		        	if(value.visible) {
		        		t.visibleStepObject[i] = { 'jsonIndex' : key };
		        		i = i + 1;
		        	}
		        });
		    });

	 }]);
});

define([
        //dependency path (relative to scripts folder)
        'angular',
        'jquery',
        'services/dataservice'], function (
            //pass required dependencies
            angular,
            jquery,
            DataService
            ) {
    'use strict';

    /**
     * @ngdoc function
     * @name oslerApp.controller:StopCtrl
     * @description
     * # StopCtrl
     * Controller of the oslerApp
     */

    angular.module('oslerApp.controllers.StopCtrl', [])
        .controller('StopCtrl', [
            '$scope',
            '$location',
            '$rootScope',
            'DataService',
            function(
                $scope,
                $location,
                $rootScope,
                dataService) {

            var t = this;

            dataService.getData('../data/team.json','GET')
            .then(function (promise) {
                t.team = promise.data.team;
                t.text = promise.data.default;
                t.about = promise.data.about;

                if($rootScope.$$childHead.container.stopText === '') {
                    $scope.$emit('stopText', t.text);
                }
            });

        }]);
});

define(['angular'], function (angular) {
  'use strict';
	/**
	* @ngdoc directive
	* @name oslerApp.directive:angularCompile
	* @description
	* # angularCompile
	*/

	angular.module('oslerApp.directives.AngularCompile', [], ["$compileProvider", function($compileProvider) {
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
define([
	//dependency path (relative to scripts folder)
	'angular'], function (
	 //pass required dependencies
	angular) {
	'use strict';

	/**
	* @ngdoc directive
	* @name oslerApp.directive:progressBar
	* @description
	* # progressBar
	*/
	angular.module('oslerApp.directives.ProgressBar', [])
	.controller('ProgressBar', ['$scope','$rootScope', '$location',
		function($scope, $rootScope, $location) {

		// listen for the event in the relevant $scope
		$rootScope.$on('mainEvent', function (event, data) {
			$scope.location  = data.locationCurrent;
			$scope.locationUpdate  = data._locationUpdate;
			$scope.stepControl  = data.stepControlObject;
			$scope.visibleSteps  = data.visibleStepObject;
		});

	}])
	.directive('progressBar', function () {
	  return {
		templateUrl: '/views/partials/progress-bar.html'
	  };
	});
});

define([
		//dependency path (relative to scripts folder)
		'angular',
		'jquery',
		'services/dataservice'], function (
			//pass required dependencies
			angular,
			jquery,
			DataService
			) {
	'use strict';

	/**
	 * @ngdoc schedules
	 * @name oslerApp.directive:Schedules
	 * @description
	 * # schedules
	 */
	angular.module('oslerApp.directives.Schedules', [])
		.controller('Schedules', ['$scope','$rootScope','$sce','DataService',
			function($scope, $rootScope, $sce, dataService, myOffCanvas) {
			var t = this,
				i,
				j,
				schedulePath,
				trimResult;

			dataService.getData('../data/schedules.json','GET')
				.then(function (promise) {
					t.schedules = promise.data;
					for (j = 0; j < dataService.objectCount(t.schedules); j++) {
						t._gatherHTMLPartials(j + 1, t.schedules[j + 1].id);
					};
					t.active = 0;
				});

				t._open = (function(id) {
					t.active = 1;
					for (i = 1; i <= dataService.objectCount(t.schedules); i++) {
						if(t.schedules[i].id === id) {
							t.focus = id;
							t.title = t.schedules[i].title;
							t.body = t.schedules[i].body;
						}
					}
				});

				t._gatherHTMLPartials = (function(index, id) {
					schedulePath = '../data/schedules/' + id + '.html';
					dataService.getData(schedulePath,'GET', '', 'html')
						.then(function (promise) {
							t.schedules[index].body = promise.data.replace("\n", "");
						});
				});

		}])
		.directive('schedules', function () {
			return {
				templateUrl: '/views/partials/schedules.html'
			};
		});
});
(function ($) {

/**
* @function
* @property {object} jQuery plugin which runs handler function once specified element is inserted into the DOM
* @param {function} handler A function to execute at the time when the element is inserted
* @param {bool} shouldRunHandlerOnce Optional: if true, handler is unbound after its first invocation
* @example $(selector).waitUntilExists(function);
*/

$.fn.waitUntilExists    = function (handler, shouldRunHandlerOnce, isChild) {
    var found   = 'found';
    var $this   = $(this.selector);
    var $elements   = $this.not(function () { return $(this).data(found); }).each(handler).data(found, true);

    if (!isChild)
    {
        (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] =
            window.setInterval(function () { $this.waitUntilExists(handler, shouldRunHandlerOnce, true); }, 500)
        ;
    }
    else if (shouldRunHandlerOnce && $elements.length)
    {
        window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
    }

    return $this;
}

}(jQuery));
/*jshint unused: vars */
require.config({
	paths: {
		angular: '../../bower_components/angular/angular',
		'angular-resource': '../../bower_components/angular-resource/angular-resource',
		jquery: '../../bower_components/jquery/dist/jquery',
		'jquery.cookie': '../../bower_components/jquery.cookie/jquery.cookie',
		'jquery.waituntilexists': 'ext/jquery.waituntilexists',
		foundation: '../../bower_components/foundation/js/foundation',
		'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
		'jquery.scrollTo': '../../bower_components/jquery.scrollTo/jquery.scrollTo',
		'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
		'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router'
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

define([
	'angular',
	'jquery',
	'jquery.scrollTo',
	'jquery.waituntilexists'],
		function (
			angular,
			jQuery,
			scrollTo,  // jshint ignore:line
			waituntilexists // jshint ignore:line
	) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name oslerApp.Animations
	 * @description
	 * # Animations
	 * Service in the oslerApp.
	 */
	angular.module('oslerApp.services.Animations', [])
	.service('Animations', function () {

		return {

			scrollTo : function(location, question) {
				jQuery(function( $ ){

					var offset = 0,
						queue = true,
						goTo = location;

					//borrowed from jQuery easing plugin
					//http://gsgd.co.uk/sandbox/jquery.easing.php
					$.easing.elasout = function(x, t, b, c, d) {
						var s = 1.70158,
							p = 0,
							a = c;
						if (t === 0) { return b; }
						if ((t/=d) === 1) { return b + c; }
						if (!p) { p = d*0.3; }
						if (a < Math.abs(c)) { a = c; s = p/4; }
						else { s = p/(2*Math.PI) * Math.asin (c/a);}
						return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
					};

					if(parseInt(question, 10) > 0) {
						offset =  {left: 0, top: -440 };
					}

					if(parseInt(question, 10) === 1) {
						$.scrollTo(0);
					} else {
						$.scrollTo(goTo, 365, {
							offset: offset,
							queue: queue
						});
					}

				});
			},
			growLine : function(location, step) {
				jQuery("#step_" + step + " .question.visible").waitUntilExists(function() {

					//As each question is revealed, calculate length of line
						var qObj = jQuery("#step_" + step + " .question.visible"),
							marginAdded = 100,
							lineHeight = [],
							viewHeight = [],
							i = 0,
							line = 0,
							view;

						//Start is variable to length of step description
						if(qObj.length === 1 ) {
							window.drawLine = {
								"start" : jQuery("#step_" + step + "_question_1").get(0).getBoundingClientRect().top,
								"offset" : 260
							};
						}

						lineHeight = [window.drawLine.start - window.drawLine.offset];

						//For each question (minus current), add to lineHeight array for calculation
						for (i = 0; i < qObj.length - 1; i++) {
							lineHeight.push(jQuery(qObj[i]).get(0).clientHeight + marginAdded);
						}

						//Calculate all div heights to increase line length
						line = lineHeight.reduce(function(previousValue, currentValue){
						    return currentValue + previousValue;
						});

						jQuery(".line").height(line);

					//As the viewport grows, update height to avoid long steps getting cut off
						//For each question, add to viewHeight array for calculation
						for (i = 0; i < qObj.length; i++) {
							viewHeight.push(jQuery(qObj[i]).get(0).clientHeight + marginAdded);
						}

						//Calculate all div heights to increase line length
						view = viewHeight.reduce(function(previousValue, currentValue){
						    return currentValue + previousValue;
						});

						var viewport = jQuery("#guide"),
							threshold = view + 800,
							minHeight = 1234;

						if(threshold < minHeight) {
							viewport.height(minHeight);
						} else {
							viewport.height(threshold);
						}

				}, false, false);

			}
		};

	});
});

define([
	'angular',
	'jquery',
	'jquery.waituntilexists'],
		function (
			angular,
			jQuery,
			waituntilexists
	) {
	'use strict';

	/**
	 * @ngdoc service
	 * @name oslerApp.services:DataService
	 * @description
	 * # DataService
	 * Service in the oslerApp.
	 */

	angular.module('oslerApp.services.DataService', [])
	.service('DataService', ["$http", "$q", function ($http, $q) {

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

			spanReplace : function (step, question) {
				/*
				jQuery('p.qdef').waitUntilExists(function(){
					// should bold the first 5 words, but it doesn't work on the paragraphs with a note for some reason...
					var elem = document.getElementById('step_'+step+'_question_'+question),
						txt = elem.children[0].children[0].innerHTML;
					console.log(txt);
					//jQuery('p.qdef').each(function(){
					//     var me = $(this);
					//     me.html(me.html().replace(/^(\w+\s\w+\s\w+\s\w+\s\w+)/, '<strong>$1</strong>'));
					//});
				}, false, false);
				*/
			}

		};
	}]);
});