/**
 * Play screen, which will start the game as well
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/PlayScreen.html',
    'brejep/fillsnfixes',
    'utils/keypoll',
    'game/asteroids',
    'stats'
], function ($, _, Backbone, screenTemplate, Fixes, KeyPoll, Asteroids, Stats) {
    'use strict';

    var CANVAS_WIDTH = 800,
        CANVAS_HEIGHT = 600;

    var PlayScreen = Backbone.View.extend({
        template: _.template(screenTemplate),

        initialize: function () {
            // some polyfills and additions to base javascript classes
            Fixes.initialise();

            // init keyboard poll
            KeyPoll.initialise(window);

            // init Stats
            this.stats = new Stats();
            this.stats.setMode(0); // 0: fps, 1: ms
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
            this.asteroids.start();
        },

        // Stops & destroy the game
        stopGame: function () {
            this.asteroids.stop();
        }
    });

    return PlayScreen;
});
