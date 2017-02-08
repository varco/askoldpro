define([
    'angular'],
        function (
            angular
    ) {
    'use strict';

    /**
     * @ngdoc service
     * @name oldproApp.services:RunnerService
     * @description
     * # RunnerService
     * Service in the oldproApp.
     */

    angular.module('oldproApp.services.RunnerService', [])
    .service('RunnerService', [
            "$rootScope",
        function (
            $rootScope) {

        var r = $rootScope;

        return {

            dataStartup : function() {

                r.__state = {
                    "fresh" : true,
                    "location" : "landing",
                    "last" : "",
                    "drawLine" : {},
                    "schedules" : {
                        "active" : 0,
                        "focus" : 0,
                        "title" : 0,
                        "body" : 0
                    },
                    "modal" : {
                        "text" : "",
                        "bypass" : false,
                        "buttons" : {
                            "close" : {
                                "text" : "Dismiss",
                                "action" : r.__services._dismiss,
                            },
                            "proceed" : {
                                "text" : "Proceed to Next Step",
                                "action" : r.__services._terminate
                            }
                        }
                    }
                };

                r.__config = {
                    "year" : new Date().getFullYear(),
                    "googleAnalytics" : "UA-XXXXX-X"
                };

                r.__data = {
                    "steps" : {},
                    "stepControlObject" : {},
                    "visibleStepObject" : {},
                    "current" : {},
                    "previous" : {},
                    "schedules" : {},
                    "contact" : {
                        "team" : {},
                        "message" : {
                            "termination" : "",
                            "default" : ""
                        },
                        "about" : {}
                    },
                };
            },

            dataBuild : function() {
                var r = $rootScope;

                r.__services._data.getData('data/steps.json','GET').
                    then(function (promise) {
                        r.__data.steps = promise.data[0];
                        r.__data.stepControlObject = {};
                        r.__services._location.buildoutStepsObject(r.__data.steps);
                        r.__data.current = [1,1];
                        r.__data.previous = [1,1];
                        r.__services._location.locationUpdate(r.__data.current, 'none', r.__data.current);
                    });

                r.__services._data.getData('data/team.json','GET')
                    .then(function (promise) {
                        r.__data.contact.team = promise.data.team;
                        r.__data.contact.message.termination = promise.data.default;
                        r.__data.contact.message.default = promise.data.default;
                        r.__data.contact.about = promise.data.about;
                    });

                r.__services._data.getData('data/schedules.json','GET')
                    .then(function (promise) {
                        r.__data.schedules = promise.data;
                        for (var j = 0; j <  r.__services._data.objectCount(r.__data.schedules); j++) {
                            r.__services._data.gatherHTMLPartials(j + 1, r.__data.schedules[j + 1].id);
                        }
                    });
            }

        };

    }]);
});
