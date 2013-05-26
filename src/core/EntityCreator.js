/**
 * Big class for creating & destroying all game entities
 */
define([
    'ash',
    'components/Asteroid',
    'components/SpaceShip',
    'components/Bullet',
    'components/Position',
    'components/Motion',
    'components/MotionControl',
    'components/Gun',
    'components/GunControl',
    'components/Display',
    'graphics/CanvasAssetsManager',
    'graphics/CreateJSAssetsManager',
    'graphics/ThreeJSAssetsManager',
    'utils/keyboard',
    'preload',
    'sound'
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
    CanvasAssetsManager,
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

            // get canvas context, only for HTML canvas
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

            case this.gameState.RENDERER_CANVAS:
                this.assetManager = new CanvasAssetsManager({
                    canvasContext: this.canvasContext
                });
                break;
            }

            // load sound after load graphics assets
            var that = this;
            if (this.assetManager) {
                this.assetManager.loadAssets(function () {
                    that._loadSounds(callback);
                });
            } else {
                // TODO error exception here...
            }
        },

        // load sound assets
        _loadSounds: function (callback) {
            var preload = new createjs.LoadQueue();
            preload.installPlugin(createjs.Sound);
            preload.addEventListener('complete', function (event) {
                if (callback) {
                    callback();
                }
            });

            var basePath = 'assets/sounds/';
            preload.loadManifest([
                {
                    id: 'sound-pew',
                    src: basePath + 'laser.mp3' + '|' + basePath + 'laser.ogg'
                },
                {
                    id: 'sound-thrust',
                    src: basePath + 'thruster.mp3' + '|' + basePath + 'thruster.ogg'
                },
                {
                    id: 'sound-start',
                    src: basePath + 'levelstart.mp3' + '|' + basePath + 'levelstart.ogg'
                },
                {
                    id: 'sound-explosion',
                    src: basePath + 'explosion.mp3' + '|' + basePath + 'explosion.ogg'
                }
            ]);
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

            var displayComponent = this.assetManager.createAsteroidsShape(radius);
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

            // handle motion control based on game renderer
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

            // create view
            var displayComponent = this.assetManager.createSpaceShipShape();
            if (displayComponent) {
                spaceship.add(new Display(displayComponent));
            }

            this.game.addEntity(spaceship);

            createjs.Sound.play('sound-start');

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
                    sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y,
                    parentPosition.rotation, 0))
                .add(new Motion(cos * 150, sin * 150, 0, 0));

            // create view
            var displayComponent = this.assetManager.createBulletShape();
            if (displayComponent) {
                bullet.add(new Display(displayComponent));
            }

            this.game.addEntity(bullet);

            createjs.Sound.play('sound-pew');

            return bullet;
        },

        /**
        * Destroys an asteroid. Also remove the entity from the game
        * and may add new & smaller asteroids
        */
        destroyAsteroid: function (asteroidEntity) {
            var position = asteroidEntity.get(Position);
            if (position && (position.collisionRadius > 10)) {
                // create a smaller asteroids
                this.createAsteroid(position.collisionRadius - 10,
                    position.position.x + Math.random() * 10 - 5,
                    position.position.y + Math.random() * 10 - 5);
            }

            this.destroyEntity(asteroidEntity);

            createjs.Sound.play('sound-explosion');
        }
    });

    return EntityCreator;
});
