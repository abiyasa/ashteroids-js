/**
 * System to change game state based on key poll
 * (e.g pause or quit)
 */
define([
    'ash',
    'nodes/GameStateNode',
    'components/GameState',
    'utils/keyboard'
], function (Ash, GameStateNode, GameState, Keyboard) {
    var GameStateControlSystem = Ash.System.extend({
        keyPoll: null,
        gameState: null,

        constructor: function (keyPoll, gameState) {
            this.keyPoll = keyPoll;
            this.gameState = gameState;
            return this;
        },

        addToEngine: function (engine) {
            //this.nodeList = engine.getNodeList(GameStateNode);
        },

        removeFromEngine: function (engine) {
            //this.nodeList = null;
        },

        update: function (time) {
            if (this.keyPoll.isDown(Keyboard.ESCAPE)) {
                // only update the first game state
                /*
                var gameStateNode = this.nodeList.head;
                if (gameStateNode) {
                    gameStateNode.gameState = GameState.prototype.STATUS_GAME_PAUSE;
                }
                */

                // TODO cannot pause when you're dead
                this.gameState.status = GameState.prototype.STATUS_GAME_PAUSE;
            }
        }
    });

    return GameStateControlSystem;
});
