module.exports = function (grunt) {

    // project config
    grunt.initConfig({
        // get metadata from package
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            files: [
                'Gruntfile.js', 'build.js', 'build.min.js',
                'src/**/*.js', 'lib/brejep/*.js'
            ],
            options: {
                // Define globals exposed by modern browsers.
                browser: true,

                // for logging poor-man's debugging: console, alert, ...
                devel: true,

                // Define globals exposed by jQuery.
                jquery: false,

                // Douglas Crockford JavaScript coding style.
                white: false,

                // Force all variable names to use either camelCase style or UPPER_CASE
                // with underscores.
                camelcase: true,

                // Prohibit use of == and != in favor of === and !==.
                eqeqeq: true,

                // Suppress warnings about == null comparisons.
                eqnull: true,

                // Enforce tab width of several spaces.
                indent: 4,

                // Prohibit use of a variable before it is defined.
                latedef: true,

                // Require capitalized names for constructor functions.
                newcap: true,

                // Enforce use of single quotation marks for strings.
                quotmark: 'single',

                // Prohibit trailing whitespace.
                trailing: true,

                // Prohibit use of explicitly undeclared variables.
                undef: true,

                // Warn when variables are defined but never used.
                unused: false,

                // Custom globals
                predef : [
                    'define',
                    'require',
                    'module'
                ]
            }
        },

        // requirejs config
        requirejs: {
            options: {
                mainConfigFile: 'build.js'
            },
            compile: {
                options: {
                    optimize: 'none',
                    out: 'build/ashteroids.js'
                }
            },
            minified: {
                options: {
                    optimize: 'uglify',
                    paths: {
                        jquery: 'lib/utils/loader.jquery'
                    },
                    out: 'build/ashteroids.min.js'
                }
            }
        },

        // connect server
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    keepalive: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'requirejs']);
};
