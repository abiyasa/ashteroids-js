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

        notifySaveSettings: function (event) {
            var buttonId = event.currentTarget.id;

            if (buttonId === 'button-ok') {
                // TODO update game settings
                var renderMode = this.$('#select-render-mode').val();
                console.log('render mode=' + renderMode);
            }

            // trigger event for changing screen
            this.trigger('changeScreen', 'main');
        }
    });

    return SettingsScreen;
});
