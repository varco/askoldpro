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
	 * @name oldproApp.Animations
	 * @description
	 * # Animations
	 * Service in the oldproApp.
	 */
	angular.module('oldproApp.services.Animations', [])
	.service('Animations', ["$rootScope", "$timeout", function ($rootScope, $timeout) {

        return {

			scrollTo : function() {

                jQuery(function( $ ){

					var r = $rootScope,
                        offset = 0,
						goTo = "#step_" + r.__data.current[0] + "_question_" + r.__data.current[1],
                        question = r.__data.current[1];

					//From jQuery easing plugin - http://gsgd.co.uk/sandbox/jquery.easing.php
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
						offset =  {left: 0, top: -180 };
					}

					if(parseInt(question, 10) === 1) {
						$.scrollTo(0);
					} else {
                        $timeout(
                            function() {
                                $.scrollTo(goTo, 365, {
                                    offset: offset
                                });
                            },
                            300
                        );
					}

				});
			},
			growViewport : function() {

                //As each question is revealed, calculate length of line
                //As the viewport grows, update height to avoid long steps getting cut off
                //Start is variable to length of step description

                jQuery(".animateCurrent .question.visible").waitUntilExists(function() {
                    var qObj = jQuery(".animateCurrent .question.visible"),
                        nObj = jQuery(".animateCurrent .none"),
                        viewport = jQuery("#guide"),
                        i = 0,
                        qHeight = [],
                        nHeight = [],
                        nView,
                        qView,
                        threshold = 800,
                        minHeight = 800,
                        marginAdded = 100;

                    //For each question, add to viewHeight array for calculation
                    for (i = 0; i < qObj.length; i++) {
                        qHeight.push(jQuery(qObj[i]).get(0).clientHeight + marginAdded);
                    }

                    for (i = 0; i < nObj.length; i++) {
                        nHeight.push(jQuery(nObj[i]).get(0).clientHeight);
                    }

                    //Calculate all div heights to increase line length
                    qView = qHeight.reduce(function(previousValue, currentValue){
                        return currentValue + previousValue;
                    });

                    nView = qHeight.reduce(function(previousValue, currentValue){
                        return currentValue + previousValue;
                    });

                    threshold += qView;
                    threshold += nView;

                    if(threshold < minHeight) {
                        viewport.height(minHeight);
                    } else {
                        viewport.height(threshold);
                    }
                }, false, false);

			},

            note : function(step, question, value) {
                var r = $rootScope;

                if(question === 0) {
                    r.__data.steps[step].note.clicked = value;
                } else {
                    r.__data.steps[step].questions[question].note.clicked = value;
                }
                this.growViewport(100);
            },

            openSchedule : function(id) {
                var r = $rootScope,
                    i;

                r.__state.schedules.active = 1;
                for (i = 1; i <= r.__services._data.objectCount(r.__data.schedules); i++) {
                    if(r.__data.schedules[i].id === id) {
                        r.__state.schedules.focus = i;
                        r.__state.schedules.title = r.__data.schedules[i].title;
                        r.__state.schedules.body = r.__data.schedules[i].body;
                    }
                }
            },

		};

	}]);
});
