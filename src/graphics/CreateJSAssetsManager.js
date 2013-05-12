/**
 * Managing & creating assets using CreateJS
 */
define([
    'ash',
    'easel',
    'preload'
], function (Ash, createjs) {

    var AssetManager = Ash.Class.extend({
        constructor: function (options) {
            this.options = options || {};

            this.useBitmapAssets = this.options.useBitmapAssets;
        },

        /**
        * Loads all assets
        */
        loadAssets: function (callback) {
            if (!this.useBitmapAssets) {
                // no assets to load, delay 0.5s
                window.setTimeout(function () {
                    if (callback) {
                        callback();
                    }
                }, 1000);
            } else {
                // load assets using preload js
                var that = this;
                var preload = new createjs.LoadQueue();
                preload.addEventListener('complete', function (event) {
                    // create sprite sheet
                    var loadedSprite = preload.getResult('spritesheet');
                    var data = {
                        images: [ loadedSprite ],
                        frames: [
                            // ship
                            [ 36, 6, 27, 21, 0, 13, 10 ],

                            // asteroids
                            [ 47, 32, 69, 75, 0, 34, 37 ],

                            // bullet
                            [ 9, 7, 11, 4, 0, 5, 2 ]
                        ]
                    };
                    that.spriteSheet = new createjs.SpriteSheet(data);

                    if (callback) {
                        callback();
                    }
                });

                preload.loadFile({id: 'spritesheet', src: 'assets/ashteroids.png' });
            }
        },

        /**
         * Creates an asteroid shapes object
         */
        createAsteroidsShape: function (radius, options) {
            if (this.useBitmapAssets && this.spriteSheet) {
                var asteroids = new createjs.BitmapAnimation(this.spriteSheet);
                asteroids.gotoAndStop(1);
                asteroids.scaleX = (radius * 2) / asteroids.getBounds().width;
                asteroids.scaleY = (radius * 2) / asteroids.getBounds().height;

                return asteroids;
            } else {
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
            }
        },

        /**
         * Creates the space ship shape object
         */
        createSpaceShipShape: function (options) {
            if (this.useBitmapAssets && this.spriteSheet) {
                var ship = new createjs.BitmapAnimation(this.spriteSheet);
                ship.gotoAndStop(0);

                return ship;
            } else {
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
            }
        },

        /**
         * Create a bullet shape
         */
        createBulletShape: function (options) {
            if (this.useBitmapAssets && this.spriteSheet) {
                var bullet = new createjs.BitmapAnimation(this.spriteSheet);
                bullet.gotoAndStop(2);
                bullet.rotation = 90;

                var container = new createjs.Container();
                container.addChild(bullet);

                return container;
            } else {
                var g = new createjs.Graphics();
                g.beginFill(createjs.Graphics.getRGB(0xFFFFFF, 1.0));
                g.arc(0, 0, 2, 0, Math.PI * 2, false);
                g.endFill();

                return new createjs.Shape(g);
            }
        }

    });

    return AssetManager;
});
