/**
 * Node for rendering Display component
 */
define([
    'ash', 'components/Position', 'components/Display'
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
