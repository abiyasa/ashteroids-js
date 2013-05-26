/**
* Component for storing position, rotation, and collision radius
*/
define(['ash', 'utils/point'], function (Ash, Point) {
    var Position = Ash.Class.extend({
        /**
        * @param x position x
        * @param y position y
        * @param rotation rotation value
        * @param collisionRadius collision radius
        */
        constructor: function (x, y, rotation, collisionRadius) {
            this.position = new Point(x, y);
            this.rotation = rotation;
            this.collisionRadius = collisionRadius;
        }
    });

    return Position;
});
