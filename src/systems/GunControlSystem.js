/**
 * System to control gun shoots based on key poll or user control
 */
define([
    'ash',
    'nodes/GunControlNode'
], function (Ash, GunControlNode) {
    var GunControlSystem = Ash.System.extend({
        keyPoll: null,
        creator: null,
        nodeList: null,

        constructor : function (keyPoll, creator) {
            this.keyPoll = keyPoll;
            this.creator = creator;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList(GunControlNode);
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
                gun = node.gun;

            gun.shooting = this.keyPoll.isDown(control.trigger);
            gun.timeSinceLastShot += time;
            if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
                this.creator.createUserBullet(gun, position);
                gun.timeSinceLastShot = 0;
            }
        }
    });

    return GunControlSystem;
});
