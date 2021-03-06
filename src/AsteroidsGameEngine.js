/**
* The main game engine
*/
define([
    'components/GameState',
    'systems/GameManager',
    'systems/MotionControlSystem',
    'systems/GunControlSystem',
    'systems/BulletAgeSystem',
    'systems/MovementSystem',
    'systems/CollisionSystem',
    'systems/CanvasRenderSystem',
    'systems/CreateJSRenderSystem',
    'systems/ThreeRenderSystem',
    'systems/GameStateControlSystem',
    'systems/SystemPriorities',
    'core/EntityCreator',
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
    CanvasRenderSystem,
    CreateJSRenderSystem,
    ThreeRenderSystem,
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

        constructor: function (canvas, stats, gameConfig) {
            this.width = canvas.width;
            this.height = canvas.height;

            this.engine = new Ash.Engine();

            this.gameState = new GameState(this.width, this.height);
            this._processGameConfig(gameConfig);

            var creator = this.entityCreator = new EntityCreator(this.engine, canvas, this.gameState);

            this.engine.addSystem(new GameManager(this.gameState, creator),
                SystemPriorities.PRE_UPDATE);
            this.engine.addSystem(new GameStateControlSystem(KeyPoll, this.gameState),
                SystemPriorities.PRE_UPDATE);
            this.engine.addSystem(new MotionControlSystem(KeyPoll),
                SystemPriorities.UPDATE);
            this.engine.addSystem(new GunControlSystem(KeyPoll, creator),
                SystemPriorities.UPDATE);
            this.engine.addSystem(new BulletAgeSystem(creator),
                SystemPriorities.UPDATE);
            this.engine.addSystem(new MovementSystem(this.gameState),
                SystemPriorities.MOVE);
            this.engine.addSystem(new CollisionSystem(creator),
                SystemPriorities.RESOLVE_COLLISIONS);

            // handle multi renderer
            var rendererSystem;
            switch (this.gameState.renderer) {
            case this.gameState.RENDERER_CREATE_JS:
            case this.gameState.RENDERER_CREATE_JS_BITMAP:
                rendererSystem = new CreateJSRenderSystem(canvas);
                break;

            case this.gameState.RENDERER_CANVAS:
                rendererSystem = new CanvasRenderSystem(creator.canvasContext);
                break;

            case this.gameState.RENDERER_THREE_JS:
                rendererSystem = new ThreeRenderSystem(canvas);
                break;
            }
            if (rendererSystem) {
                this.engine.addSystem(rendererSystem, SystemPriorities.RENDER);
            }

            this.tickProvider = new TickProvider(stats);

            // some signals
            this.gameStateChanged = new Ash.Signals.Signal();
        },

        // process the game config & assign them to the game state
        _processGameConfig: function (gameConfig) {
            var renderMode = gameConfig.renderMode || 'canvas';
            switch (renderMode) {
            case 'createjs':
                renderMode = this.gameState.RENDERER_CREATE_JS;
                break;

            case 'createjs-bitmap':
                renderMode = this.gameState.RENDERER_CREATE_JS_BITMAP;
                break;

            case 'threejs':
                renderMode = this.gameState.RENDERER_THREE_JS;
                break;

            case 'canvas':
                renderMode = this.gameState.RENDERER_CANVAS;
                break;
            }

            this.gameState.renderer = renderMode;
        },

        /**
        * Load all game assets before starting the game.
        * Call this before calling start()
        *
        * @param callback callback function when loading is done
        */
        loadAssets: function(callback) {
            var that = this;
            this.entityCreator.loadAssets(callback);
        },

        // start the game
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

        // pause the game for temporary
        pause: function () {
            this.tickProvider.stop();
        },

        // un-pause the game after it's being paused
        unpause: function () {
            this.tickProvider.start();

            // set game state to unpause
            this.gameState.status = GameState.prototype.STATUS_GAME_PLAY;
        },

        // checking game state and trigger events
        checkGameState: function () {
            switch (this.gameState.status) {
            case GameState.prototype.STATUS_GAME_OVER:
                // trigger game over
                this.gameStateChanged.dispatch('gameOver');
                break;

            case GameState.prototype.STATUS_GAME_PAUSE:
                this.gameStateChanged.dispatch('gamePause');
                break;
            }
        }
    });

    return Asteroids;
});
