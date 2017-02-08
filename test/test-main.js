var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Removed "Spec" naming from files
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app/scripts',

    paths: {
		angular: '../../bower_components/angular/angular',
		'angular-resource': '../../bower_components/angular-resource/angular-resource',
		jquery: '../../bower_components/jquery/dist/jquery',
		'jquery.cookie': '../../bower_components/jquery.cookie/jquery.cookie',
		'jquery.waituntilexists': 'ext/jquery.waituntilexists',
		'angular-sanitize': '../../bower_components/angular-sanitize/angular-sanitize',
		'jquery.scrollTo': '../../bower_components/jquery.scrollTo/jquery.scrollTo',
		'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
		'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router',
		'ev-emitter': '../../bower_components/ev-emitter/ev-emitter',
		foundation: '../../bower_components/foundation/js/foundation'
	},

    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-resource': ['angular'],
        'angular-touch': ['angular'],
        'angular-mocks': {
          deps:['angular'],
          'exports':'angular.mock'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
