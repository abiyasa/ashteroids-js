// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js

/* global requirejs */
requirejs.config({
    // all modules loaded are relative to this path
    // e.g. require(['grid/core']) would grab /lib/grid/core.js
    baseUrl: 'src',

    // specify custom module name paths
    paths: {
        // JavaScript folders.
        templates: '../templates',

        // Libraries
        ash: '../lib/ash/ash',
        stats: '../components/stats.js/src/Stats',
        jquery: '../lib/utils/loader.jquery',
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        fillsnfixes: '../lib/utils/fillsnfixes',
        createjs: '../lib/utils/loader.createjs',
        three: '../components/threejs/build/three',

        // plugins
        text: '../components/requirejs-text/text',
        carousel: '../lib/utils/bootstrap-carousel'
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        stats: {
            exports: 'Stats'
        },
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        createjs: {
            exports: 'createjs'
        },
        three: {
            exports: 'THREE'
        },
        carousel: {
            deps: ['jquery'],
            exports: 'plugins'
        }
    },

    // target amd loader shim as the main module, path is relative to baseUrl.
    name: '../components/almond/almond',

    // DON'T touch this since it will altered by grunt. See Gruntfile.js
    optimize: 'none',

    // files to include along with almond.  only lib/skeleton.js is defined, as
    // it pulls in the rest of the dependencies automatically.
    include: [ 'MainApp' ],

    // Initialize the application with the main application file.
    // grunt will empty this during build/optimization. See Gruntfile.js
    deps: ['MainApp'],

    // build file destination, relative to the build file itself
    // DON'T touch this since it will altered by grunt. See Gruntfile.js
    out: '../build/ashteroids.js'
});
