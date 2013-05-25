/**
* Component for controlling the motion/movement.
* Storing all keys which can trigger movement or rotation
*/
define(['ash'], function (Ash) {
    var MotionControls = Ash.Class.extend({
        /**
        * @left key for rotating left
        * @right key for rotating right
        * @accelerate key for accelerating
        * @accelerateRate acceleration speed
        * @rotationRate rotation speed
        */
        constructor: function (left, right, accelerate, accelerationRate, rotationRate) {
            this.left = left;
            this.right = right;
            this.accelerate = accelerate;
            this.accelerationRate = accelerationRate;
            this.rotationRate = rotationRate;
        }
    });

    return MotionControls;
});
