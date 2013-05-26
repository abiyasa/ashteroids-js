/**
* Node for bullet, will processed by collision system
*/
define([
    'ash', 'components/Bullet', 'components/Position'
], function (Ash, Bullet, Position) {
    var BulletCollision = Ash.Node.extend({
        bullet: null,
        position: null,
        types: {
            bullet : Bullet,
            position : Position
        },

        constructor: function () { }
    });

    return BulletCollision;
});
