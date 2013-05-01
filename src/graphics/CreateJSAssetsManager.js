/**
 * Managing & creating assets using CreateJS
 */
define([
    'ash',
    'easel'
], function (Ash, createjs) {

    var AssetManager = Ash.Class.extend({
        constructor: function (options) {
            this.options = options || {};
        },

        /**
         * Creates an asteroid shapes object
         */
        createAsteroidsShape: function (radius, options) {
            var points = [];

            // init shape points
            var angle = 0;
            while (angle < Math.PI * 2) {
                var length = (0.75 + Math.random() * 0.25) * radius;
                var posX  = Math.cos(angle) * length;
                var posY  = Math.sin(angle) * length;
                points.push({ x: posX, y: posY });

                angle += Math.random() * 0.5;
            }

            // draw points
            var g = new createjs.Graphics();
            g.setStrokeStyle(2);
            g.beginStroke(createjs.Graphics.getRGB(0xFFFFFF, 1.0));
            g.beginFill(createjs.Graphics.getRGB(0x9B59B6, 1.0));
            g.moveTo(points[0].x, points[0].y);
            for (var i = 1; i < points.length; i++) {
                g.lineTo(points[i].x, points[i].y);
            }
            g.closePath();
            g.endFill();
            g.endStroke();

            return new createjs.Shape(g);
        },

        /**
         * Creates the space ship shape object
         */
        createSpaceShipShape: function (options) {
            var g = new createjs.Graphics();
            g.setStrokeStyle(2);
            g.beginStroke(createjs.Graphics.getRGB(0xFFFFFF, 1.0));
            g.beginFill(createjs.Graphics.getRGB(0xE74C3C, 1.0));
            g.moveTo(8, 0);
            g.lineTo(-7, 7);
            g.lineTo(-4, 0);
            g.lineTo(-7, -7);
            g.closePath();
            g.endFill();
            g.endStroke();

            return new createjs.Shape(g);
        },

        /**
         * Create a bullet shape
         */
        createBulletShape: function (options) {
            var g = new createjs.Graphics();
            g.beginFill(createjs.Graphics.getRGB(0xC0392B, 1.0));
            g.arc(0, 0, 2, 0, Math.PI * 2, false);
            g.endFill();

            return new createjs.Shape(g);
        }

    });

    return AssetManager;
});
