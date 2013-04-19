define([
    'game/components/gamestate',
    'game/systems/gamemanager',
    'game/systems/motioncontrolsystem',
    'game/systems/guncontrolsystem',
    'game/systems/bulletagesystem',
    'game/systems/movementsystem',
    'game/systems/collisionsystem',
    'game/systems/rendersystem',
    'game/systems/GameStateControlSystem',
    'game/systems/systempriorities',
    'game/entitycreator',
    'ash',
    'utils/tickprovider',
    'utils/keypoll'
], function (
    GameState,
    GameManager,
    MotionControlSystem,
    GunControlSystem,
    BulletAgeSystem,
    MovementSystem,
    CollisionSystem,
    RenderSystem,
    GameStateControlSystem,
    SystemPriorities,
    EntityCreator,
    Ash,
    TickProvider,
    KeyPoll
) {

    var Asteroids = Ash.Class.extend({
        width: 0,
        height: 0,
        engine: null,
        gameState: null,
        tickProvider: null,

        constructor: function (canvas, stats) {
            var canvasContext = canvas.getContext('2d');

            this.width = canvas.width;
            this.height = canvas.height;

            this.engine = new Ash.Engine();

            this.gameState = new GameState(this.width, this.height);

            var creator = new EntityCreator(this.engine, canvasContext);

            this.engine.addSystem(new GameManager(this.gameState, creator),
                SystemPriorities.preUpdate);
            this.engine.addSystem(new GameStateControlSystem(KeyPoll, this.gameState),
                SystemPriorities.preUpdate);
            this.engine.addSystem(new MotionControlSystem(KeyPoll),
                SystemPriorities.update);
            this.engine.addSystem(new GunControlSystem(KeyPoll, creator),
                SystemPriorities.update);
            this.engine.addSystem(new BulletAgeSystem(creator),
                SystemPriorities.update);
            this.engine.addSystem(new MovementSystem(this.gameState),
                SystemPriorities.move);
            this.engine.addSystem(new CollisionSystem(creator),
                SystemPriorities.resolveCollisions);
            this.engine.addSystem(new RenderSystem(canvasContext),
                SystemPriorities.render);
            this.tickProvider = new TickProvider(stats);

            // some signals
            this.gameStateChanged = new Ash.Signals.Signal();
        },

        start: function () {
            this.gameState.reset(0, 3, 0);

            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.add(this.checkGameState, this);
            this.tickProvider.start();
        },

        // stop & destory the game
        stop: function () {
            this.tickProvider.stop();
            this.tickProvider.removeAll();

            this.engine.removeAllSystems();
            this.engine.removeAllEntities();
        },

        // checking game state and trigger events
        checkGameState: function () {
            if (this.gameState.status === GameState.prototype.STATUS_GAME_OVER) {
                // trigger game over
                this.gameStateChanged.dispatch('gameOver');
            }
        }
    });

    return Asteroids;
});
