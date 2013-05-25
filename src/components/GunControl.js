/**
* Component for controlling/triggering the gun
*/
define(['ash'], function (Ash) {
    var GunControl = Ash.Class.extend({
        /**
        * @param trigger The key to trigger the gun
        */
        constructor: function (trigger) {
            this.trigger = trigger;
        }
    });

    return GunControl;
});
