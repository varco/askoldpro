// Generated on 2015-10-08 using generator-angular-require 1.0.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    test: 'test'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    appPaths: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= appPaths.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= appPaths.app %>/sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= appPaths.app %>/{,*/}*.html',
          '.tmp/css/{,*/}*.css',
          '<%= appPaths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/sass',
                connect.static('./app/sass')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= appPaths.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= appPaths.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= appPaths.dist %>/{,*/}*',
            '!<%= appPaths.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= appPaths.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
      src: ['<%= appPaths.app %>/css/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },


    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= appPaths.app %>/scss',
        cssDir: '.tmp/css',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= appPaths.app %>/images',
        javascriptsDir: '<%= appPaths.app %>/scripts',
        fontsDir: '<%= appPaths.app %>/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= appPaths.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= appPaths.dist %>/css/{,*/}*.css',
          //'<%= appPaths.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= appPaths.dist %>/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= appPaths.app %>/index.html',
      options: {
        dest: '<%= appPaths.dist %>'
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= appPaths.dist %>/{,*/}*.html'],
      css: ['<%= appPaths.dist %>/css/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= appPaths.dist %>',
          //'<%= appPaths.dist %>/images',
          '<%= appPaths.dist %>/css'
        ]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= appPaths.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= appPaths.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= appPaths.dist %>/scripts/scripts.js': [
    //         '<%= appPaths.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appPaths.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= appPaths.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= appPaths.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= appPaths.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= appPaths.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= appPaths.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          // cwd: '<%= appPaths.app %>/scripts',
          src: ['<%= appPaths.app %>/scripts/**/*.js'],
          dest: '.tmp'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= appPaths.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      test: {
        files: [{
            expand: true,
            dot: true,
            //cwd: '<%= appPaths.test %>',
            dest: '.tmp/',
            src: [
                'bower_components/**/*.js'
          ]
        }
        ]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= appPaths.app %>',
          dest: '<%= appPaths.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'data/*.json',
            'data/**/*.html',
            'fonts/*.*',
            'css/{,*/}*.css'
          ]
        }, {
          expand: true,
          cwd: '.',
          dest: '.tmp',
          src: ['bower_components/**/*']
        }, {
          expand: true,
          cwd: '.',
          dest: '<%= appPaths.dist %>',
          src: ['bower_components/**/*']
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= appPaths.dist %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= appPaths.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    // Settings for grunt-bower-requirejs
    bowerRequirejs: {
      app: {
        rjsConfig: '<%= appPaths.app %>/scripts/main.js',
        options: {
          exclude: ['requirejs', 'json3', 'es5-shim']
        }
      },
      test: {
        rjsConfig: '<%= appPaths.app %>/../test/test-main.js',
        options: {
          exclude: ['requirejs', 'json3', 'es5-shim']
        }
      }
    },

    replace: {
      test: {
        src: '<%= appPaths.app %>/../test/test-main.js',
        overwrite: true,
        replacements: [{
          from: /paths: {[^}]+}/,
          to: function() {
            return require('fs').readFileSync(grunt.template.process('<%= appPaths.app %>') + '/scripts/main.js').toString().match(/paths: {[^}]+}/);
          }
        }]
      }
    },

        // r.js compile config
        requirejs: {
          dist: {
            options: {
              dir: '<%= appPaths.dist %>/scripts/',
              modules: [{
                name: 'main'
              }],
              preserveLicenseComments: false, // remove all comments
              removeCombined: true,
              baseUrl: '.tmp/<%= appPaths.app %>/scripts',
              mainConfigFile: '.tmp/<%= appPaths.app %>/scripts/main.js',
              optimize: 'uglify2',
              uglify2: {
                mangle: false
              }
            }
          },
          test: {
            options: {
              dir: '<%= appPaths.dist %>/scripts/',
              modules: [{
                name: 'main'
              }],
              preserveLicenseComments: false, // remove all comments
              removeCombined: true,
              baseUrl: '.tmp/<%= appPaths.app %>/scripts',
              mainConfigFile: '.tmp/<%= appPaths.app %>/scripts/main.js',
              optimize: 'uglify2',
              uglify2: {
                mangle: false
              }
            }
          }
        }
      });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'bowerRequirejs:app',
      'concurrent:server',
      'autoprefixer:server',
      'connect:livereload',
      'watch'
    ]);
  });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'bowerRequirejs:app',
    'replace:test',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    //'ngAnnotate',
    //'copy:test',
    //'requirejs:test',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'bowerRequirejs:app',
    'replace:test',
    'concurrent:dist',
    'autoprefixer',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'filerev',
    'usemin',
    'requirejs:dist',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
