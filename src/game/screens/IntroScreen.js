/**
 * Intro screen, shown before any other screen
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/IntroScreen.html'
], function ($, _, Backbone, screenTemplate) {
    'use strict';
    var IntroScreen = Backbone.View.extend({
        template: _.template(screenTemplate),

        events: {
            'click #button-go': 'notifyStart'
        },

        initialize: function () {
            // start time
            setTimeout(this.notifyStart.bind(this), 1000);
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        notifyStart: function () {
            // trigger event for changing screen
            this.trigger('changeScreen', 'main');
        }
    });

    return IntroScreen;
});
