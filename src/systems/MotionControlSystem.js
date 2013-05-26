/**
* System to update the motion data (speed, rotation) based on the user control
*/
define([
    'ash', 'nodes/MotionControlNode', 'sound'
], function (Ash, MotionControlNode, createjs) {
    var MotionControlSystem = Ash.System.extend({
        keyPoll: null,
        nodeList: null,

        constructor: function (keyPoll) {
            this.keyPoll = keyPoll;
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(MotionControlNode);

            this.nodeList.nodeRemoved.add(this._onNodeRemoved, this);
        },

        removeFromEngine: function (engine) {
            this.nodeList.nodeRemoved.remove(this._onNodeRemoved);
            this.nodeList = null;
        },

        update: function (time) {
            for(var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {
            var control = node.control,
                position = node.position,
                motion = node.motion;

            if(this.keyPoll.isDown(control.left)) {
                position.rotation -= control.rotationRate * time;
            }
            if (this.keyPoll.isDown(control.right)) {
                position.rotation += control.rotationRate * time;
            }

            // thrust
            if (this.keyPoll.isDown(control.accelerate)) {
                var acceleration = control.accelerationRate * time;
                motion.velocity.x += Math.cos(position.rotation) * acceleration;
                motion.velocity.y += Math.sin(position.rotation) * acceleration;

                // play SFX
                var sfx = control.soundThrust;
                if (sfx && sfx.playState === createjs.Sound.PLAY_FINISHED) {
                    // play infinite time
                    sfx.play(createjs.Sound.INTERRUPT_NONE, 0, 0, 1);
                }
            } else {
                this._stopSFX(control.soundThrust);
            }
        },

        /**
        * triggered when the motion control node is removed
        */
        _onNodeRemoved: function (node) {
            this._stopSFX(node.control.soundThrust);
        },

        /**
        * Stops a specific SFX immediately
        */
        _stopSFX: function (sfx) {
            if (sfx && sfx.playState !== createjs.Sound.PLAY_FINISHED) {
                sfx.stop();
            }
        }
    });

    return MotionControlSystem;
});
