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
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
            'components/jquery/jquery'
        ],
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',
        fillsnfixes: '../lib/utils/fillsnfixes',

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
        }
    }
});
