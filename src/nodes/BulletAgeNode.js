/**
* Node for handling bullet lifetime/age system.
* To be processed by BulletAgeSystem
*/
define([
    'ash', 'components/Bullet'
], function(Ash, Bullet ) {
    var BulletAge = Ash.Node.extend({
        bullet: null,
        types: {
            bullet : Bullet
        },

        constructor: function () { }
    });

    return BulletAge;
});
