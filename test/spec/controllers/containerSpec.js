/*jshint unused: vars */

define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
  'use strict';

  describe('Controller: ContainerCtrl', function () {

    var ContainerCtrl, $state;

    module('oslerApp.controllers.ContainerCtrl');

    //mock module to allow us to inject our own dependencies
    beforeEach(angular.mock.module('oslerApp.controllers.ContainerCtrl', 'ui.router'));

    //mock the controller for the same reason and include $rootScope and $controller
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$state_) {
      //create an empty scope
      ContainerCtrl = $rootScope.$new();
      $state = _$state_;
      //declare the controller and inject our empty scope
      $controller('ContainerCtrl', { $scope : ContainerCtrl });

    }));

    // tests start here
    it('should set the year variable', function(){
       //console.log(ContainerCtrl);
       //expect(ContainerCtrl.year).toBe('2016');
    });

  });
});


