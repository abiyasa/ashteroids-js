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
            'click #button-start': 'notifyStart'
        },

        initialize: function () {
            // TODO start timer here...
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        notifyStart: function () {
            // trigger event for changing screen
            this.trigger('changeScreen', 'play');
        }
    });

    return MainScreen;
});
