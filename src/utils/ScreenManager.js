/**
 * Manages the displayed screens (Backbone Views)
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var ScreenManager = Backbone.View.extend({
        /**
         * Shows the specified screen. Will automatically remove the currently shown screen
         */
        showScreen: function (theScreen) {
            // check if the current screen is being shown
            if (this.currentView !== theScreen) {
                this.clearScreen();
                $(this.el).append(theScreen.render().el);

                this.currentScreen = theScreen;
                this.currentScreen.trigger('screenAdded');
            }

            return this;
        },

        /**
         * clear the currently shown screen
         */
        clearScreen: function () {
            $(this.el).empty();

            if (this.currentScreen) {
                this.currentScreen.trigger('screenRemoved');
                this.currentScreen.off();
                this.currentScreen = undefined;
            }
        }
    });

    return ScreenManager;
});
