define([
    'ash', 'components/MotionControl',
    'components/Position', 'components/Motion'
], function (Ash, MotionControls, Position, Motion) {
    var MotionControl = Ash.Node.extend({
        control: null,
        position: null,
        motion: null,
        types: {
            control : MotionControls,
            position : Position,
            motion : Motion
        },

        constructor: function () { }
    });

    return MotionControl;
});
