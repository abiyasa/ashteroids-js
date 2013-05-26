define([
    'ash', 'components/SpaceShip', 'components/Position'
], function (Ash, Spaceship, Position) {
    var SpaceshipCollision = Ash.Node.extend({
        spaceship: null,
        position: null,
        types: {
            spaceship : Spaceship,
            position : Position
        },

        constructor: function () { }
    });

    return SpaceshipCollision;
});
