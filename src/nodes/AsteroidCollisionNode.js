/**
* Node for asteroid, will processed by collision system
*/
define([
    'ash',
    'components/Asteroid',
    'components/Position'
], function (Ash, Asteroid, Position) {
    var AsteroidCollision = Ash.Node.extend({
        asteroid: null,
        position: null,

        types: {
            asteroid : Asteroid,
            position : Position
        },

        constructor: function () { }
    });

    return AsteroidCollision;
});
