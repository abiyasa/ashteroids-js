/**
* Gun component for shooting bullet
*/
define(['ash', 'utils/point'], function (Ash, Point) {
    var Gun = Ash.Class.extend({
        /**
        * @param offsetX offset position from parent, where the bullet will be shot
        * @param offsetY offset position from parent, where the bullet will be shot
        * @param minShotInterval Interval between gun shots
        * @param bulletLifetime bullet life time
        */
        constructor: function (offsetX, offsetY, minShotInterval, bulletLifetime) {
            this.shooting = false;
            this.timeSinceLastShot = 0;
            this.offsetFromParent = new Point(offsetX, offsetY);
            this.minimumShotInterval = minShotInterval;
            this.bulletLifetime = bulletLifetime;
        }
    });

    return Gun;
});
