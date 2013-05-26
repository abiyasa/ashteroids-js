/**
* Component for controlling the motion/movement.
* Storing all keys which can trigger movement or rotation
*/
define(['ash'], function (Ash) {
    var MotionControls = Ash.Class.extend({
        /**
        * @param left key for rotating left
        * @param right key for rotating right
        * @param accelerate key for accelerating
        * @param accelerateRate acceleration speed
        * @param rotationRate rotation speed
        * @param soundThrust Sound effect when the space ship is thrusting
        */
        constructor: function (left, right, accelerate, accelerationRate,
            rotationRate, soundThrust) {
            this.left = left;
            this.right = right;
            this.accelerate = accelerate;
            this.accelerationRate = accelerationRate;
            this.rotationRate = rotationRate;

            this.soundThrust = soundThrust;
        }
    });

    return MotionControls;
});
