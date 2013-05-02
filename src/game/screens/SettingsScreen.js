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

        initialize: function (config) {
            this.config = config || {};
        },

        render: function () {
            $(this.el).html(this.template());

            // get & display the render mode selection
            this.$renderModeSelection = this.$('#select-render-mode');
            this.$renderModeSelection.val(this.config.renderMode || 'canvas');

            return this;
        },

        notifySaveSettings: function (event) {
            var buttonId = event.currentTarget.id;

            if (buttonId === 'button-ok') {
                // update game settings
                this.config.renderMode = this.$renderModeSelection.val() || 'canvas';
            }

            // trigger event for changing screen
            this.trigger('changeScreen', 'main');
        }
    });

    return SettingsScreen;
});
