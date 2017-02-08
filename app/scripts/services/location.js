define([
    'angular'],
        function (
            angular
    ) {
    'use strict';

    /**
     * @ngdoc service
     * @name oldproApp.LocationService
     * @description
     * # LocationService
     * Service in the oldproApp.
     */
    angular.module('oldproApp.services.LocationService', [])
    .service('LocationService',[
            //inject
            '$rootScope', function (
                //invoke
                $rootScope

            ) {

        return {

            // Insert progress tracking (active, visible, completed) into Steps and Questions
            buildoutStepsObject : function (stepsObject) {
                var i, j,
                    r = $rootScope;

                for (i = 1; i <= r.__services._data.objectCount(stepsObject); i++) {
                    r.__data.stepControlObject[i] = {
                            'active' : false,
                            'completed' : false,
                            'visible' : false,
                            'classes' : {
                                'previous' : false,
                                'current' : false,
                                'next' : false
                            }
                        };

                    r.__data.stepControlObject[i].questions = {};

                    for (j = 1; j <= r.__services._data.objectCount(stepsObject[i].questions); j++) {
                        r.__data.stepControlObject[i].questions[j] = {
                            'active' : false,
                            'completed' : false,
                            'visible' : false
                        };
                    }
                }
            },

            locationUpdate : function locationUpdate(locationArr, action, triggered) {

                var r = $rootScope,
                    text;

                if(locationArr[0] === 0) { //Zero arrays trigger termination

                    r.__data.contact.message.termination = r.__data.steps[r.__data.current.step].questions[r.__data.current.question][action].stop;
                    r.__data.current.action = action;

                    r.__state.modal.buttons = {
                        "dismiss" : {
                            "text" : "Dismiss",
                            "action" : 'dismiss'
                        },
                        "proceed" : {
                            "text" : "Contact Old Pro",
                            "action" : 'terminate'
                        }
                    };

                    r.__services._location.updateCurrentLocationScope(triggered);

                    //Special Case for 14, 3 - no legal assistance is needed, let modal reflect this
                    if(parseInt(triggered[0], 10) === 14 && parseInt(triggered[1], 10) === 3 && action === 'yes') {
                        text = r.__data.steps[14].questions[3].yes.stop;
                    } else if(parseInt(triggered[0], 10) === 1 && parseInt(triggered[1], 10) === 4 && action === 'no') {
                        r.__state.modal.buttons.dismiss = {};
                        text = r.__data.steps[1].questions[4].no.stop;
                    } else if(parseInt(triggered[0], 10) === 3 && parseInt(triggered[1], 10) === 4 && action === 'no') {
                        text = r.__data.steps[3].questions[4].no.stop;
                    } else if(parseInt(triggered[0], 10) === 7 && parseInt(triggered[1], 10) === 1 && action === 'yes') {
                        text = r.__data.steps[3].questions[4].no.stop;
                        text = "Okay, great! It sounds like we need to have a conversation.";
                    } else {
                        text = "Thanks for completing our Q&A. We're done asking questions now.";
                    }

                    r.__services._location.interstiatialModal(text, 'exit');

                } else { //Positive arrays trigger advancement

                    if(action === 'menu') {
                        locationArr = r.__services._location.findLastActive(locationArr);
                    }

                    r.__services._location.updatePreviousLocationScope(action, triggered);
                    r.__services._location.updateCurrentLocationScope(locationArr);

                    if(r.__data.current.step > r.__data.previous.step && r.__state.modal.bypass !== true && action !== 'none') {

                        r.__state.modal.buttons = {
                            "close" : {
                                "text" : "Dismiss",
                                "action" : 'dismiss'
                            },
                            "proceed" : {
                                "text" : "Next Step",
                                "action" : 'proceed'
                            }
                        };

                        r.__services._location.interstiatialModal("<strong>Good stuff, that helps direct things.</strong><br>Just a few more questions ... :) <span>Click <em>Next Step</em> to continue <em>Dismiss</em> to review your answers.</span>");

                    } else if(parseInt(triggered[0], 10) === 6 && parseInt(triggered[1], 10) === 2 && action === 'no') {
                        text = r.__data.steps[6].questions[2].no.stop;
                        r.__services._location.interstiatialModal(text, 'exit');
                    } else if(parseInt(triggered[0], 10) === 7 && parseInt(triggered[1], 10) === 1 && action === 'yes') {
                        text = r.__data.steps[7].questions[1].yes.stop;
                        r.__services._location.interstiatialModal(text, 'exit');
                    } else if(parseInt(triggered[0], 10) === 12 && parseInt(triggered[1], 10) === 1 && action === 'yes') {
                        text = r.__data.steps[12].questions[1].yes.stop;
                        r.__state.modal.buttons.proceed = {};
                        r.__services._location.interstiatialModal(text, 'exit');
                    } else {
                        r.__services._location.proceedWhenUnderstood();
                    }
                }
            },

            findLastActive : function (locationArr) {
                var r = $rootScope,
                    questions = r.__data.stepControlObject[locationArr[0]].questions,
                    i = 1,
                    lastActive = [];

                    for(i = 1; i <= r.__services._data.objectCount(questions); i++) {
                        if(questions[i].visible === true) {
                            lastActive.push(i);
                        }
                    }
                    locationArr[1] = lastActive.slice(-1).pop();
                    jQuery("#guide").height('3500');
                    return locationArr;
            },

            updatePreviousLocationScope : function (action, triggered) {
                var r = $rootScope;

                r.__data.previous =  r.__data.current;
                r.__data.previous.step =  r.__data.current.step;
                r.__data.previous.question = r.__data.current.question;
                r.__data.previous.action = action;

                if(triggered) {
                    r.__data.previous.trigger =  [parseInt(triggered[0], 10), parseInt(triggered[1], 10)];
                }
            },

            updateCurrentLocationScope : function (locationArr) {
                var r = $rootScope;
                r.__data.current = locationArr;
                r.__data.current.step = locationArr[0];
                r.__data.current.question = (locationArr[1] ? locationArr[1] : 0);
            },

            resetCurrentLocationScope : function () {
                var r = $rootScope;
                r.__data.current = r.__data.previous.trigger;
                r.__data.current.step = r.__data.previous.trigger[0];
                r.__data.current.question = r.__data.previous.trigger[1];
                r.__data.previous.action = '';
            },

            interstiatialModal : function (text, exit) {
                var r = $rootScope,
                    element = "#modalText p",
                    template = ['<p>', '</p>'],
                    content = text,
                    scope = r;

                r.__services._data.compiler(element, template, content, scope);
                r.__state.modal.exit = (exit ? true : false);
                r.__state.modal.text = text;
                r.__state.modal.action = r.__data.previous.action;
                r.__state.modal.active = true;
            },

            proceedWhenUnderstood : function () {
                var r = $rootScope;
                if(r.__data.stepControlObject[r.__data.current.step]) {
                    r.__services._location.resetActiveState();
                    r.__services._location.updateCompletedStep();
                    r.__services._location.updateActiveState();
                    r.__services._location.animate();
                    r.__services._location.filterVisibleSteps(r.__data.stepControlObject);
                    r.__services._location.applyClasses(r.__data.current.step);
                    r.$emit('progressBarUpdate');
                }
            },

            resetActiveState : function () {
                var r = $rootScope,
                    i,
                    j;

                for (i = 1; i <= r.__services._data.objectCount(r.__data.stepControlObject); i++) {
                    r.__data.stepControlObject[i].active = false;
                    for (j = 1; j <= r.__services._data.objectCount(r.__data.stepControlObject[i].questions); j++) {
                        r.__data.stepControlObject[i].questions[j].active = false;
                    }
                }
            },

            updateCompletedStep : function () {
                var r = $rootScope;
                r.__data.stepControlObject[r.__data.current.step].completed = true;
            },

            updateActiveState : function () {
                var r = $rootScope;
                r.__data.stepControlObject[r.__data.current.step].visible = true;
                r.__data.stepControlObject[r.__data.current.step].active = true;
                r.__data.stepControlObject[r.__data.current.step].questions[r.__data.current.question].active = true;
                r.__data.stepControlObject[r.__data.current.step].questions[r.__data.current.question].visible = true;

            },

            applyClasses : function (index) {
                var r = $rootScope,
                    i;

                for (i = 1; i <= r.__services._data.objectCount(r.__data.stepControlObject); i++) {
                    r.__data.stepControlObject[i].classes.previous =
                        r.__data.stepControlObject[i].classes.next =
                            r.__data.stepControlObject[i].classes.current = false;

                    if(i < index) {
                        r.__data.stepControlObject[i].classes.previous = true;
                    } else if(i > index) {
                        r.__data.stepControlObject[i].classes.next = true;
                    } else {
                        r.__data.stepControlObject[i].classes.current = true;
                    }
                }
            },

            filterVisibleSteps : function(items) {
                var r = $rootScope,
                    i = 1;

                angular.forEach(items, function(value, key) {
                    if(value.visible) {
                        r.__data.visibleStepObject[i] = { 'jsonIndex' : key };
                        i = i + 1;
                    }
                });
            },

            animate : function () {
                var r = $rootScope,
                    location = "#step_" + r.__data.current[0] + "_question_" + r.__data.current[1];

                r.__services._animation.growViewport(location, r.__data.current[0]);
                r.__services._animation.scrollTo(location, r.__data.current[1]);

            },

            backToGuide : function() {
                var r = $rootScope;
                r.__data.drawLine = {};
                r.__services._location.animate();
            }

        };

    }]);
});
