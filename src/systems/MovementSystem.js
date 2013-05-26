/**
* System for updating entity positon & speed based on its motion/movement data
*/
define([
    'ash', 'nodes/MovementNode'
], function (Ash, MovementNode) {
    var MovementSystem = Ash.System.extend({
        gameState: null,
        nodeList: null,
        doAFewTimes: true,

        constructor: function (gameState) {
            this.gameState = gameState;
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(MovementNode);
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },

        update: function (time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {
            var position = node.position;
            var motion = node.motion;
            position.position.x += motion.velocity.x * time;
            position.position.y += motion.velocity.y * time;

            // check boundaries
            if (position.position.x < 0) {
                position.position.x += this.gameState.width;
            }
            if (position.position.x > this.gameState.width) {
                position.position.x -= this.gameState.width;
            }
            if (position.position.y < 0) {
                position.position.y += this.gameState.height;
            }
            if (position.position.y > this.gameState.height) {
                position.position.y -= this.gameState.height;
            }

            position.rotation += motion.angularVelocity * time;

            // calculate damp
            if (motion.damping > 0) {
                var damp = motion.damping * time;
                var xDamp = Math.abs(Math.cos(position.rotation) * damp);
                var yDamp = Math.abs(Math.sin(position.rotation) * damp);
                if (motion.velocity.x > xDamp) {
                    motion.velocity.x -= xDamp;
                } else if (motion.velocity.x < -xDamp) {
                    motion.velocity.x += xDamp;
                } else {
                    motion.velocity.x = 0;
                }
                if (motion.velocity.y > yDamp) {
                    motion.velocity.y -= yDamp;
                } else if (motion.velocity.y < -yDamp) {
                    motion.velocity.y += yDamp;
                } else {
                    motion.velocity.y = 0;
                }
            }
        }
    });

    return MovementSystem;
});
