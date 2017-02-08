# README #

 * Project: Old Pro promo site
 * Version: 1.0
 * Author: M. Leslie Bent
 * http://oldpro.ca

This app is a quick skill demonstration for Rangle.io - recycling a 2016 Angular web application.

## Dependencies ##

 * Grunt build system, depends on bower.js
 * Requires npm, bower, and compass
 * RequireJS (app/index.html => app/js/main.js)
 * Angular 1.4 (appConfig in app/js/app.js)

### Highlights/Notes ###

 * ConciergeService injects local dependencies, initates preloader and listens for state changes
 * DataService calls handwritten JSON objects in /data
 * RunnerService manages overall data model as the app is traversed
 * LocationService manages user interactions with model as app is traversed
 * Angular Compile Directive for returned HTML parsed from JSON
 * Uses Angular UI-Router for better state handling

### setup ###

    `git clone git@github.com:varco/askoldpro.git`
    `sudo npm install && npm update`
    `bower install && bower update`
    `compass compile`
    `cd app && compass compile`

### build system ###
    `grunt serve`
    `grunt build`
    `grunt test`

## More code! ##

* [WordPress Makefile](https://github.com/varco/wp-makefile)
* [CodePen](http://codepen.io/var)
