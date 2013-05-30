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
            this.config = config || {};
        },

        render: function () {
            $(this.el).html(this.template());

            // activate carousel
            if (!this.$carousel) {
                this.$carousel = this.$('.carousel').carousel();
            } else {
                // TODO calling this the first time will fail
                this.$carousel.data('carousel').to(this._getRenderModeIndex());
            }


            return this;
        },

        notifyScreenChange: function (event) {
            // check which button has been clicked
            switch (event.currentTarget.id) {
            case 'button-start':
                this._updateSelectedRenderMode();
                this.trigger('changeScreen', 'play');
                break;

            case 'button-settings':
                this.trigger('changeScreen', 'settings');
                break;

            case 'button-about':
                this.trigger('changeScreen', 'about');
                break;
            }
        },

        /**
        * Internal array for available rendering modes
        * TODO: create special helper classese
        */
        _availableRenderModes: {
            'canvas': { index: 0 },
            'createjs': { index: 1 },
            'createjs-bitmap': { index: 2 },
            'threejs': { index: 3 }
        },

        /**
        * Internal function to help carousel selecting the active item based on
        * the selected rendering mode
        */
        _getRenderModeIndex: function () {
            var renderMode = this.config.renderMode || 'canvas';

            var index;
            if (this._availableRenderModes[renderMode]) {
                index = this._availableRenderModes[renderMode].index;
            } else {
                index = 0;
            }

            return index;
        },

        /**
        * Store the currently selected rendering mode based on active item on carousel
        */
        _updateSelectedRenderMode: function () {
            var selectedIndex = 0;
            if (this.$carousel) {
                selectedIndex = this.$carousel.data('carousel').getActiveIndex();
            }
            selectedIndex = selectedIndex || 0;

            for (var renderMode in this._availableRenderModes) {
                var obj = this._availableRenderModes[renderMode];
                if (obj.index === selectedIndex) {
                    this.config.renderMode = renderMode;
                    break;
                }
            }
        }
    });

    return MainScreen;
});
