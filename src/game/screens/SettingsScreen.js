/**
 * Settings screen
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SettingsScreen.html'
], function ($, _, Backbone, screenTemplate) {
    'use strict';

    var SettingsScreen = Backbone.View.extend({
        template: _.template(screenTemplate),

        events: {
            'click #button-ok': 'notifySaveSettings',
            'click #button-cancel': 'notifySaveSettings'
        },

        initialize: function () {
            // TODO load game settings
        },

        render: function () {
            $(this.el).html(this.template());
            return this;
        },

        notifySaveSettings: function () {
            var buttonId = event.currentTarget.id;

            if (buttonId === 'button-ok') {
                // TODO update game settings
            }

            // trigger event for changing screen
            this.trigger('changeScreen', 'main');
        }
    });

    return SettingsScreen;
});
