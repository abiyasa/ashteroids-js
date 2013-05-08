/**
 * Intro screen, shown before any other screen
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/MainScreen.html'
], function ($, _, Backbone, screenTemplate) {
    'use strict';

    var MainScreen = Backbone.View.extend({
        template: _.template(screenTemplate),

        events: {
            'click #button-start': 'notifyScreenChange',
            'click #button-settings': 'notifyScreenChange'
        },

        initialize: function (config) {
            // nothing to do yet
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        notifyScreenChange: function (event) {
            // check which button has been clicked
            switch (event.currentTarget.id) {
            case 'button-start':
                // trigger event for changing screen
                this.trigger('changeScreen', 'play');
                break;

            case 'button-settings':
                // trigger event for changing screen
                this.trigger('changeScreen', 'settings');
                break;
            }
        }
    });

    return MainScreen;
});
