/**
 * Big class for creating & destroying all game entities
 */
define([
    'ash',
    'game/components/asteroid',
    'game/components/spaceship',
    'game/components/bullet',
    'game/components/position',
    'game/components/motion',
    'game/components/motioncontrols',
    'game/components/gun',
    'game/components/guncontrols',
    'components/Display',
    'game/graphics/asteroidview',
    'game/graphics/spaceshipview',
    'game/graphics/bulletview',
    'graphics/CreateJSAssetsManager',
    'graphics/ThreeJSAssetsManager',
    'utils/keyboard'
], function (
    Ash,
    Asteroid,
    Spaceship,
    Bullet,
    Position,
    Motion,
    MotionControls,
    Gun,
    GunControls,
    Display,
    AsteroidView,
    SpaceshipView,
    BulletView,
    CreateJSAssetsManager,
    ThreeJSAssetsManager,
    Keyboard,
    createjs
) {

    var EntityCreator = Ash.Class.extend({
        game: null,
        gameState: null,
        canvas: null,
        canvasContext: null,

        constructor: function (game, canvas, gameState) {
            this.game = game;
            this.canvas = canvas;
            this.gameState = gameState;

            // get canvas context if it's 2D
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CANVAS:
                this.canvasContext = canvas.getContext('2d');
                break;
            }
        },

        destroyEntity: function(entity) {
            this.game.removeEntity(entity);
        },

        /**
        * Loads all assets based on the current game renderer
        *
        * @callback Callback function called when all assets have been loaded
        */
        loadAssets: function (callback) {
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CREATE_JS_BITMAP:
            case this.gameState.RENDERER_CREATE_JS:
                this.assetManager = new CreateJSAssetsManager({
                    useBitmapAssets: this.gameState.renderer === this.gameState.RENDERER_CREATE_JS_BITMAP
                });
                break;

            case this.gameState.RENDERER_THREE_JS:
                this.assetManager = new ThreeJSAssetsManager();
                break;
            }

            if (this.assetManager) {
                this.assetManager.loadAssets(callback);
            } else {
                // TODO callback with error
                if (callback) {
                    callback();
                }
            }
        },

        /**
         * Creates asteroids using the given position & data
         */
        createAsteroid: function(radius, x, y) {
            var asteroid = new Ash.Entity()
                .add(new Asteroid())
                .add(new Position(x, y, 0, radius))
                .add(new Motion((Math.random() - 0.5) * 4 * (50 - radius),
                    (Math.random() - 0.5) * 4 * (50 - radius),
                    Math.random() * 2 - 1, 0));

            // create view based on game renderer
            var displayComponent;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CANVAS:
                displayComponent = new AsteroidView(radius, this.canvasContext);
                break;

            default:
                displayComponent = this.assetManager.createAsteroidsShape(radius);
                break;
            }
            if (displayComponent) {
                asteroid.add(new Display(displayComponent));
            }

            this.game.addEntity(asteroid);
            return asteroid;
        },

        /**
         * Creates the player's spaceship
         */
        createSpaceship: function(x, y) {
            var spaceship = new Ash.Entity()
                .add(new Spaceship())
                .add(new Position(x, y, 1, 6))
                .add(new Motion(0, 0, 0, 15))
                .add(new Gun(8, 0, 0.3, 2))
                .add(new GunControls(Keyboard.Z));

            // create view based on game renderer
            var motionControl;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_THREE_JS:
                // invert controller for 3D mode
                motionControl = new MotionControls(Keyboard.RIGHT, Keyboard.LEFT, Keyboard.UP, 100, 3);
                break;

            default:
                motionControl = new MotionControls(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, 100, 3);
                break;
            }
            if (motionControl) {
                spaceship.add(motionControl);
            }

            // create view based on game renderer
            var displayComponent;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CANVAS:
                displayComponent = new SpaceshipView(this.canvasContext);
                break;

            default:
                displayComponent = this.assetManager.createSpaceShipShape();
                break;
            }
            if (displayComponent) {
                spaceship.add(new Display(displayComponent));
            }

            this.game.addEntity(spaceship);
            return spaceship;
        },

        /**
         * Creates spaceship bullet
         */
        createUserBullet: function(gun, parentPosition) {
            var cos = Math.cos(parentPosition.rotation);
            var sin = Math.sin(parentPosition.rotation);
            var bullet = new Ash.Entity()
                .add(new Bullet(gun.bulletLifetime))
                .add(new Position(
                    cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                    sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0))
                .add(new Motion(cos * 150, sin * 150, 0, 0));

            // create view based on game renderer
            var displayComponent;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CANVAS:
                displayComponent = new BulletView(this.canvasContext);
                break;

            default:
                displayComponent = this.assetManager.createBulletShape();
                break;
            }
            if (displayComponent) {
                bullet.add(new Display(displayComponent));
            }

            this.game.addEntity(bullet);
            return bullet;
        }
    });

    return EntityCreator;
});
