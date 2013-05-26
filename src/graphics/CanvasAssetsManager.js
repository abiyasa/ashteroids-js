/**
 * Managing & creating game assets using html canvas
 */
define([
    'ash'
], function (Ash) {
    /**
    * Display Object for an asteroids.
    * This is an internal class.
    */
    var AsteroidView = Ash.Class.extend({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        rotation: 0,
        radius: 0,

        constructor: function (radius, graphic) {
            this.graphic = graphic;
            this.radius = radius;
            this.width = radius;
            this.height = radius;
            this.points = [];
            var angle = 0;
            while (angle < Math.PI * 2) {
                var length = (0.75 + Math.random() * 0.25) * radius;
                this.points.push({
                    x: Math.cos(angle) * length,
                    y: Math.sin(angle) * length
                });

                angle += Math.random() * 0.5;
            }
            this.draw();
        },

        draw: function () {
            var graphic = this.graphic;

            graphic.save();
            graphic.beginPath();
            graphic.translate(this.x, this.y);
            graphic.rotate(this.rotation);

            graphic.fillStyle = '#FFFFFF';
            graphic.moveTo(this.radius, 0);
            for (var i = 0; i < this.points.length; i++) {
                graphic.lineTo(this.points[i].x, this.points[i].y);
            }
            graphic.lineTo(this.radius, 0);
            graphic.fill();

            graphic.restore();
        }
    });

    /**
    * Display Object for a bullet.
    * This is an internal class.
    */
    var BulletView = Ash.Class.extend({
        x: 0,
        y: 0,
        width: 4,
        height: 4,
        rotation: 0,
        radius: 0,

        constructor: function (graphic) {
            this.graphic = graphic;
            this.draw();
        },

        draw: function () {
            var graphic = this.graphic;

            graphic.save();
            graphic.beginPath();
            graphic.translate(this.x, this.y);
            graphic.rotate(this.rotation);

            graphic.fillStyle = '#FFFFFF';
            graphic.beginPath();
            graphic.arc(0, 0, 2, 0, Math.PI * 2, false);
            graphic.fill();

            graphic.restore();
        }
    });

    /**
    * Display Object for a space ship.
    * This is an internal class.
    */
    var SpaceShipView = Ash.Class.extend({
        x: 0,
        y: 0,
        width: 20,
        height: 20,
        rotation: 0,
        radius: 0,

        constructor: function (graphic) {
            this.graphic = graphic;
            this.draw();
        },

        draw: function () {
            var graphic = this.graphic;

            graphic.save();
            graphic.translate(this.x, this.y);
            graphic.rotate(this.rotation);
            graphic.fillStyle = '#FFFFFF';
            graphic.beginPath();
            graphic.moveTo(8, 0);
            graphic.lineTo(-7, 7);
            graphic.lineTo(-4, 0);
            graphic.lineTo(-7, -7);
            graphic.lineTo(10, 0);
            graphic.fill();

            graphic.restore();
        }
    });

    /**
    * The asset manager, which will be accessable form outside
    */
    var AssetManager = Ash.Class.extend({
        constructor: function (options) {
            this.options = options || {};

            this.canvasContext = options.canvasContext;
        },

        /**
        * Loads all assets
        */
        loadAssets: function (callback) {
            // TODO use object pool?

            // nothing to load here...
            if (callback) {
                callback();
            }
        },

        /**
         * Creates an asteroid shapes object
         */
        createAsteroidsShape: function (radius, options) {
            var view;
            if (this.canvasContext) {
                view = new AsteroidView(radius, this.canvasContext);
            }
            return view;
        },

        /**
         * Creates the space ship shape object
         */
        createSpaceShipShape: function (options) {
            var view;
            if (this.canvasContext) {
                view = new SpaceShipView(this.canvasContext);
            }
            return view;
        },

        /**
         * Create a bullet shape
         */
        createBulletShape: function (options) {
            var view;
            if (this.canvasContext) {
                view = new BulletView(this.canvasContext);
            }
            return view;
        }

    });

    return AssetManager;
});
