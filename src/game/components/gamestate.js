define(['ash'], function (Ash) {
    var GameState = Ash.Class.extend({
        STATUS_GAME_INIT: 0,
        STATUS_GAME_PLAY: 10,
        STATUS_GAME_PAUSE: 20,
        STATUS_GAME_OVER: 30,

        RENDERER_CANVAS: 0,
        RENDERER_CREATE_JS: 10,

        constructor: function (width, height, renderer) {
            this.lives = 0;
            this.level = 0;
            this.points = 0;
            this.width = width;
            this.height = height;
            this.status = this.STATUS_GAME_INIT;

            //this.renderer = renderer || this.RENDERER_CANVAS;
            this.renderer = renderer || this.RENDERER_CREATE_JS;
        },

        // reset game state before a game starts
        reset: function (level, lives, point) {
            this.level = level;
            this.lives = lives;
            this.point = point;

            this.status = this.STATUS_GAME_PLAY;
        }
    });

    return GameState;
});
