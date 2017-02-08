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
 * Handwritten JSON objects in /data

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
