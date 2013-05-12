/**
 * Play screen, which will start the game as well
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'game/asteroids',
    'stats',
    'text!templates/PlayScreen.html',
    'text!templates/PauseDialog.html',
    'text!templates/LoadingDialog.html'
], function ($, _, Backbone, Asteroids, Stats, screenTemplate,
    pauseDialogTemplate, loadingDialogTemplate) {
    'use strict';

    var CANVAS_WIDTH = 640,
        CANVAS_HEIGHT = 480;

    var PlayScreen = Backbone.View.extend({
        template: _.template(screenTemplate),
        templatePauseDialog: _.template(pauseDialogTemplate),
        templateLoadingDialog: _.template(loadingDialogTemplate),

        initialize: function (config) {
            // process the game config
            this.gameConfig = config || { };

            // init Stats
            this.stats = new Stats();
            this.stats.setMode(0); // 0: fps, 1: ms

            this.on('screenAdded', function () {
                // will automatically start the game
                this.startGame();
            });

            this.on('screenRemoved', function () {
                // will automatically stop the game
                this.stopGame();
            });
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
            canvasElem.setAttribute('class', 'canvas-game');

            return canvasElem;
        },

        render: function () {
            this.$el.html(this.template());

            // dynamically adjust screen container
            this.$el.css({
                margin: '0px auto',
                width: CANVAS_WIDTH + 'px',
                height: '100%'
            });

            // dynamically set width to the containers inside the screen
            var that = this;
            [ '.container-modals' , '.container-game', 'container-instruction' ].forEach(function (element) {
                that.$('.container-modals').css({
                    width: CANVAS_WIDTH + 'px'
                });
            });

            // init & show canvas
            this.gameCanvas = this._createCanvas();
            var $gamewrapper = this.$('.container-game');
            $gamewrapper.append(this.gameCanvas);

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
            this.asteroids = new Asteroids(this.gameCanvas, this.stats, this.gameConfig);
            this.isPaused = false;

            // load game assets
            this._showDialog(this.templateLoadingDialog());
            var that = this;
            this.asteroids.loadAssets(function () {
                // the game is ready to be started
                that._removeDialog();

                that.asteroids.gameStateChanged.add(that.onGameStateChanged, that);
                that.asteroids.start();
            });
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

                this.asteroids.pause();

                // show pause menu
                this._showDialog(this.templatePauseDialog());
            }
        },

        // internal function to unpause the game
        _unpauseGame: function () {
            if (this.isPaused) {
                this.isPaused = false;

                // remove pause dialog
                this._removeDialog();

                this.asteroids.unpause();
            }
        },

        // Show pause or loading dialog
        _showDialog: function (dialog) {
            this.$('.container-modals').html(dialog);
        },

        // remove any dialog
        _removeDialog: function () {
            this.$('.container-modals').empty();
        }
    });

    return PlayScreen;
});
