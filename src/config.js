// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main-app'],

    paths: {
        // JavaScript folders.
        brejep: '../lib/brejep',
        utils: 'utils',
        game: 'game',
        templates: '../templates',

        // Libraries
        ash: '../lib/ash/ash',
        Stats: '../lib/utils/Stats',
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
            'components/jquery/jquery'
        ],
        underscore: '../components/underscore/underscore',
        backbone: '../components/backbone/backbone',

        // plugins
        text: '../components/requirejs-text/text'
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
    }
});
