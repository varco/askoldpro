define([
    'angular'],
        function (
            angular
    ) {
    'use strict';

    /**
     * @ngdoc service
     * @name oldproApp.services:StatesService
     * @description
     * # StatesService
     * Service in the oldproApp.
     */

    angular.module('oldproApp.services.StatesService', [])
    .service('StatesService', ["$rootScope", "$state", "$timeout", function ($rootScope, $state, $timeout) {

        return {

            state : function (to, from) {

                $rootScope.__state = {
                    "location" : to,
                    "previous" : from
                };

                switch(to) {
                    case "contact":
                        if (from === "landing") {
                            $rootScope.__services._animation.scrollTo(0);
                            $rootScope.__data.contact.message.text = $rootScope.__data.contact.message.default;
                        }
                    break;
                }
            },

            proceed: function() {
                $rootScope.__services._location.proceedWhenUnderstood();
                $rootScope.__state.modal.active = false;
            },

            terminate: function() {
                $state.go('contact');
                $rootScope.__state.modal.active = false;
            },

            dismiss: function() {
                var r = $rootScope,
                    no = null,
                    yes = null;

                if(r.__data.current[0] >  r.__data.previous[0]) {
                    r.__data.current =  r.__data.previous;
                    r.__data.current.step = r.__data.previous.step;
                    r.__data.current.question = r.__data.previous.question;
                }
                r.__state.modal.active = false;
                r.__services._animation.scrollTo();

                no = document.getElementById("answer_"+r.__data.current[0]+"_"+r.__data.current[1]+"_no");
                yes = document.getElementById("answer_"+r.__data.current[0]+"_"+r.__data.current[1]+"_yes");

                if(yes || no) { yes.checked = false; no.checked = false; }

            },

            triggerProgressBar: function() {
                var r = $rootScope;
                r.$emit('progressBarUpdate');
            },

            bypass: function() {
                var r = $rootScope;
                r.__state.modal.bypass = true;
            },

            reset: function() {
                $rootScope.__services._runner.dataStartup();
                $rootScope.__services._runner.dataBuild();
                $timeout(
                    function() {
                        $rootScope.__state.fresh = false;
                    },
                    500
                );
            },

            terminalText: function() {
                $rootScope.$on('stopText', function(event, data) {
                    $rootScope.__data.termination.text = data;
                    $state.go('stop');
                });
            }

        };

    }]);
});