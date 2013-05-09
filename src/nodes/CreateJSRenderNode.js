/**
 * Node for rendering CreateJSDisplay component
 */
define([
    'ash', 'game/components/position', 'components/Display'
], function (Ash, Position, Display) {
    var Render = Ash.Node.extend({
        position: null,
        display: null,
        types: {
            position: Position,
            display: Display
        },

        constructor: function () { }
    });

    return Render;
});
