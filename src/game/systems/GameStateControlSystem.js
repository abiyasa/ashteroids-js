/**
 * System to change game state based on key poll
 * (e.g pause or quit)
 */
define([
    'ash',
    'game/nodes/GameState',
    'game/components/gamestate',
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
                    gameStateNode.gameState = GameState.prototype.STATUS_GAME_OVER;
                }
                */
                this.gameState.status = GameState.prototype.STATUS_GAME_OVER;
            }
        }
    });

    return GameStateControlSystem;
});
