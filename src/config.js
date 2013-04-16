// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['asteroids-app'],

    paths: {
        // JavaScript folders.
        brejep: '../lib/brejep',
        utils: 'utils',
        game: 'game',

        // Libraries
        ash: '../lib/ash/ash',
        Stats: '../lib/utils/Stats',
        jquery: '../components/jquery/jquery.js',
        underscore: '../components/underscore/underscore.js',
        backbone: '../components/backbone/backbone.js',
        marionette: '../components/backbone.marionette/lib/backbone.marionette.js'
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
        },
        marionette: {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        }
    }
});
