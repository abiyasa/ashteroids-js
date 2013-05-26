/**
* System for maintaining bullet life time & removing them when their time is up
*/
define([
    'ash', 'nodes/BulletAgeNode'
], function (Ash, BulletAgeNode) {
    var BulletAgeSystem = Ash.System.extend({
        creator: null,
        nodeList: null,

        constructor: function (creator) {
            this.creator = creator;
        },

        addToEngine: function (engine) {
            this.nodeList = engine.getNodeList( BulletAgeNode );
        },

        removeFromEngine: function (engine) {
            this.nodeList = null;
        },

        update: function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        },

        updateNode: function (node, time) {
            var bullet = node.bullet;
            bullet.lifeRemaining -= time;
            if (bullet.lifeRemaining <= 0) {
                this.creator.destroyEntity(node.entity);
            }
        }
    });

    return BulletAgeSystem;
});
