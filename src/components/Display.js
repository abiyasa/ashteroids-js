/**
 * Placeholder for any displayable object (CreateJS, Canvas, or ThreeJS)
 */
define(['ash'], function (Ash) {
    var Display = Ash.Class.extend({

        /**
        * @displayObject Displayable object (e.g assets, graphics, ...)
        */
        constructor: function (displayObject) {
            this.displayObject = displayObject;
        }
    });

    return Display;
});
