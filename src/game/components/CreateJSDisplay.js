/**
 * Display Object component using CreateJS
 */
define(['ash'], function (Ash) {
    var Display = Ash.Class.extend({
        constructor: function (displayObject) {
            this.displayObject = displayObject;
        }
    });

    return Display;
});
