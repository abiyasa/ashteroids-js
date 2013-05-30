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
            'click .btn': 'notifyScreenChange'
        },

        initialize: function (config) {
            // nothing to do yet
        },

        render: function () {
            $(this.el).html(this.template());

            // activate carousel
            this.$('.carousel').carousel();

            return this;
        },

        notifyScreenChange: function (event) {
            // check which button has been clicked
            switch (event.currentTarget.id) {
            case 'button-start':
                this.trigger('changeScreen', 'play');
                break;

            case 'button-settings':
                this.trigger('changeScreen', 'settings');
                break;

            case 'button-about':
                this.trigger('changeScreen', 'about');
                break;
            }
        }
    });

    return MainScreen;
});
