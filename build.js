// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js

/* global requirejs */
requirejs.config({
    // all modules loaded are relative to this path
    // e.g. require(['grid/core']) would grab /lib/grid/core.js
    baseUrl: '.',

    // specify custom module name paths
    paths: {
        // JavaScript folders.
        brejep: 'lib/brejep',
        utils: 'src/utils',
        game: 'src/game',
        templates: 'templates',

        // Libraries
        ash: 'lib/ash/ash',
        Stats: 'lib/utils/Stats',
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',

        // plugins
        text: 'components/requirejs-text/text'
    },

    // Sets the configuration for your third party scripts that are not AMD compatible
    shim: {
        Stats: {
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
        }
    },

    // target amd loader shim as the main module, path is relative to baseUrl.
    name: 'lib/vendor/almond',

    optimize: 'none',

    // files to include along with almond.  only lib/skeleton.js is defined, as
    // it pulls in the rest of the dependencies automatically.
    include: [ 'src/main-app' ],

    // build file destination, relative to the build file itself
    out: 'build/ashteroids.js'
});
