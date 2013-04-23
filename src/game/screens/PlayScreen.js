/**
 * Play screen, which will start the game as well
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PlayScreen.html',
    'text!templates/PauseDialog.html',
    'brejep/fillsnfixes',
    'utils/keypoll',
    'game/asteroids',
    'stats'
], function ($, _, Backbone, screenTemplate, pauseDialogTemplate, Fixes, KeyPoll, Asteroids, Stats) {
    'use strict';

    var CANVAS_WIDTH = 400,
        CANVAS_HEIGHT = 300;

    var PlayScreen = Backbone.View.extend({
        template: _.template(screenTemplate),
        templatePauseDialog: _.template(pauseDialogTemplate),

        initialize: function () {
            // some polyfills and additions to base javascript classes
            Fixes.initialise();

            // init keyboard poll
            KeyPoll.initialise(window);

            // init Stats
            this.stats = new Stats();
            this.stats.setMode(0); // 0: fps, 1: ms
        },

        events: {
            'click #button-unpause': '_unpauseGame',
            'click #button-quit': '_quitGame'
        },

        // create canvas element dynamically
        _createCanvas: function () {
            var canvasElem = document.createElement('canvas');
            canvasElem.setAttribute('id', 'game_stage');
            canvasElem.setAttribute('width', CANVAS_WIDTH);
            canvasElem.setAttribute('height', CANVAS_HEIGHT);
            canvasElem.style.backgroundColor = '#000';

            return canvasElem;
        },

        render: function () {
            $(this.el).html(this.template());

            // init & show canvas
            this.gameCanvas = this._createCanvas();
            var $gamewrapper = this.$('.game-container').append(this.gameCanvas);

            // render stats
            var $stat = $(this.stats.domElement);
            $stat.css({
                position: 'absolute',
                top: '0px',
                left: '0px'
            });

            $gamewrapper.append($stat);

            return this;
        },

        // starts the game. Make sure everything has inited & rendered
        startGame: function () {
            this.asteroids = new Asteroids(this.gameCanvas, this.stats);
            this.asteroids.gameStateChanged.add(this.onGameStateChanged, this);
            this.asteroids.start();

            this.isPaused = false;
        },

        // Stops & destroy the game
        stopGame: function () {
            this.asteroids.stop();
        },

        // handle game state changes
        onGameStateChanged: function (newState) {
            switch (newState) {
            case 'gameOver':
                this._quitGame();
                break;

            case 'gamePause':
                this._pauseGame();
                break;
            }
        },

        // internal function to quit the game
        _quitGame: function () {
            this.stopGame();

            // back to main screen
            this.trigger('changeScreen', 'main');
        },

        // internal function to pause the game
        _pauseGame: function () {
            if (!this.isPaused) {
                this.isPaused = true;

                // show pause menu
                this.$('.modals-container').html(this.templatePauseDialog());

                this.asteroids.pause();
            }
        },

        // internal function to unpause the game
        _unpauseGame: function () {
            if (this.isPaused) {
                this.isPaused = false;

                // remove pause dialog
                this.$('.modals-container').empty();

                this.asteroids.unpause();
            }
        }
    });

    return PlayScreen;
});
