define([
    'ash', 'components/GunControl', 'components/Gun', 'game/components/position'
], function (Ash, GunControls, Gun, Position) {
    var GunControl = Ash.Node.extend({
        control: null,
        gun: null,
        position: null,
        types: {
            control : GunControls,
            gun : Gun,
            position : Position
        },

        constructor: function () { }
    });

    return GunControl;
});
