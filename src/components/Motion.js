/**
* Cononent for holding all motion data (speed, rotation, ..)
*/
define(['ash', 'utils/point'], function (Ash, Point) {
    var Motion = Ash.Class.extend({
        /**
        * @param velocityX Velocity
        * @param velocityY Velocity
        * @param angularVelocity Rotation speed
        * @param damping Friction energy, for de-acceleration
        */
        constructor: function (velocityX, velocityY, angularVelocity, damping) {
            this.velocity = new Point(velocityX, velocityY);
            this.angularVelocity = angularVelocity;
            this.damping = damping;
        }
    });

    return Motion;
});
