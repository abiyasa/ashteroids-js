// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main-app'],

    paths: {
        // JavaScript folders.
        utils: 'utils',
        game: 'game',
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
    }
});
