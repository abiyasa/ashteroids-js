/**
 * About screen, show info version, etc
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AboutScreen.html'
], function ($, _, Backbone, screenTemplate) {
    'use strict';

    var Screen = Backbone.View.extend({
        template: _.template(screenTemplate),

        events: {
            'click .btn': 'notifyDone'
        },

        initialize: function (config) {
            // nothing to do
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        notifyDone: function () {
            // trigger event for back to main
            this.trigger('changeScreen', 'main');
        }
    });

    return Screen;
});
