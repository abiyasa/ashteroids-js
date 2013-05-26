/**
* Managing the game flow (game over, next level, ...)
* TODO: re-work this class, maybe we can merge some of its methods
*/
define([
    'ash', 'nodes/SpaceshipCollisionNode',
    'nodes/AsteroidCollisionNode', 'nodes/BulletCollisionNode',
    'utils/point'
], function (Ash, SpaceshipCollisionNode, AsteroidCollisionNode,
    BulletCollisionNode, Point) {

    var GameManager = Ash.System.extend({
        gameState: null,
        creator: null,
        spaceships: null,
        asteroids: null,
        bullets: null,

        constructor: function (gameState, creator) {
            this.gameState = gameState;
            this.creator = creator;
        },

        addToEngine: function (game) {
            this.spaceships = game.getNodeList(SpaceshipCollisionNode);
            this.asteroids = game.getNodeList(AsteroidCollisionNode);
            this.bullets = game.getNodeList(BulletCollisionNode);
        },

        update: function (time) {
            // check if spaceship is just died
            if (this.spaceships.empty()) {
                if (this.gameState.lives > 0) {
                    // middle of the space
                    var newSpaceshipPosition = new Point(this.gameState.width * 0.5,
                        this.gameState.height * 0.5);

                    // make sure the area is clear before adding the spaceship
                    var clearToAddSpaceship = true;
                    var distanceToShip;
                    for (var asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                        distanceToShip = asteroid.position.position.distanceTo(newSpaceshipPosition);
                        if (distanceToShip <= asteroid.position.collisionRadius + 50) {
                            clearToAddSpaceship = false;
                            break;
                        }
                    }

                    if (clearToAddSpaceship) {
                        this.creator.createSpaceship(this.gameState.width * 0.5, this.gameState.height * 0.5);
                        this.gameState.lives--;
                    }
                } else {
                    // game over
                    this.gameState.status = this.gameState.STATUS_GAME_OVER;
                }
            }

            // all asteroids are gone
            if (this.asteroids.empty() && this.bullets.empty() &&
                !this.spaceships.empty()) {

                // next level
                this.gameState.level++;

                // generate asteroids
                var spaceship = this.spaceships.head;
                var position;
                var asteroidCount = 2 + this.gameState.level;
                for (var i = 0; i < asteroidCount; ++i) {
                    // check not on top of spaceship
                    do {
                        position = new Point(
                            Math.random() * this.gameState.width,
                            Math.random() * this.gameState.height
                       );
                    } while (position.distanceTo(spaceship.position.position) <= 80);

                    this.creator.createAsteroid(30, position.x, position.y);
                }
            }
        },

        removeFromEngine: function (game) {
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
        }
    });

    return GameManager;
});
