define(['ash'], function (Ash) {
    var GameState = Ash.Class.extend({
        STATUS_GAME_INIT: 0,
        STATUS_GAME_PLAY: 10,
        STATUS_GAME_PAUSE: 20,
        STATUS_GAME_OVER: 30,

        constructor: function (width, height) {
            this.lives = 0;
            this.level = 0;
            this.points = 0;
            this.width = width;
            this.height = height;
            this.status = this.STATUS_GAME_INIT;
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
