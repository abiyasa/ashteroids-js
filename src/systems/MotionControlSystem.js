/**
* System to update the motion data (speed, rotation) based on the user control
*/
define([
    'ash', 'nodes/MotionControlNode'
], function (Ash, MotionControlNode) {
    var MotionControlSystem = Ash.System.extend({
        keyPoll: null,
        nodeList: null,

        constructor: function (keyPoll) {
            this.keyPoll = keyPoll;
            return this;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(MotionControlNode);
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
            var control = node.control,
                position = node.position,
                motion = node.motion;

            if(this.keyPoll.isDown(control.left)) {
                position.rotation -= control.rotationRate * time;
            }
            if (this.keyPoll.isDown(control.right)) {
                position.rotation += control.rotationRate * time;
            }
            if (this.keyPoll.isDown(control.accelerate)) {
                var acceleration = control.accelerationRate * time;
                motion.velocity.x += Math.cos(position.rotation) * acceleration;
                motion.velocity.y += Math.sin(position.rotation) * acceleration;
            }
        }
    });

    return MotionControlSystem;
});
