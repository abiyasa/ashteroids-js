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
        utils: 'utils',
        game: 'game',
        core: 'core',
        templates: '../templates',

        // Libraries
        ash: '../lib/ash/ash',
        stats: '../components/stats.js/src/Stats',
        jquery: '../lib/utils/loader.jquery',
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        fillsnfixes: '../lib/utils/fillsnfixes',
        easel: '../components/easeljs/lib/easeljs-0.6.0.min',

        // plugins
        text: '../components/requirejs-text/text'
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
        easel: {
            exports: 'createjs'
        }
    },

    // target amd loader shim as the main module, path is relative to baseUrl.
    name: '../lib/vendor/almond',

    optimize: 'none',

    // files to include along with almond.  only lib/skeleton.js is defined, as
    // it pulls in the rest of the dependencies automatically.
    include: [ 'main-app' ],

    // build file destination, relative to the build file itself
    out: '../build/ashteroids.js'
});
