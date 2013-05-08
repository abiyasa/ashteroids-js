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
    'game/components/display',
    'game/components/CreateJSDisplay',
    'game/graphics/asteroidview',
    'game/graphics/spaceshipview',
    'game/graphics/bulletview',
    'graphics/CreateJSAssetsManager',
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
    CreateJSDisplay,
    AsteroidView,
    SpaceshipView,
    BulletView,
    CreateJSAssetsManager,
    Keyboard,
    createjs
) {

    var EntityCreator = Ash.Class.extend({
        game: null,
        graphics: null,
        gameState: null,

        constructor: function (game, graphics, gameState) {
            this.game = game;
            this.graphics = graphics;
            this.gameState = gameState;
        },

        destroyEntity: function(entity) {
            this.game.removeEntity(entity);
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
                displayComponent = new Display(new AsteroidView(radius, this.graphics));
                break;

            case this.gameState.RENDERER_CREATE_JS:
                displayComponent = new CreateJSDisplay(CreateJSAssetsManager.prototype.createAsteroidsShape(radius));
                break;
            }
            if (displayComponent) {
                asteroid.add(displayComponent);
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
                .add(new MotionControls(Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, 100, 3))
                .add(new Gun(8, 0, 0.3, 2))
                .add(new GunControls(Keyboard.Z));

            // create view based on game renderer
            var displayComponent;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CANVAS:
                displayComponent = new Display(new SpaceshipView(this.graphics));
                break;

            case this.gameState.RENDERER_CREATE_JS:
                displayComponent = new CreateJSDisplay(CreateJSAssetsManager.prototype.createSpaceShipShape());
                break;
            }
            if (displayComponent) {
                spaceship.add(displayComponent);
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
                displayComponent = new Display(new BulletView(this.graphics));
                break;

            case this.gameState.RENDERER_CREATE_JS:
                displayComponent = new CreateJSDisplay(CreateJSAssetsManager.prototype.createBulletShape());
                break;
            }
            if (displayComponent) {
                bullet.add(displayComponent);
            }

            this.game.addEntity(bullet);
            return bullet;
        }
    });

    return EntityCreator;
});
