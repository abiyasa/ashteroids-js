/**
* Bullet component
*/
define(['ash'], function (Ash) {
    var Bullet = Ash.Class.extend({
        /**
        * @param lifeTime Bullet life time when it does not hit anything
        */
        constructor: function (lifeTime) {
            this.lifeRemaining = lifeTime;
        }
    });

    return Bullet;
});
