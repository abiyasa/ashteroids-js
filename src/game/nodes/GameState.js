/**
 * Node for game state
 */
define([
    'ash', 'game/components/gamestate'
], function (Ash, GameState) {
    var GameStateNode = Ash.Node.extend({
        gameState: null,
        types: {
            gameState: GameState
        },

        constructor: function () { }
    });

    return GameStateNode;
});
