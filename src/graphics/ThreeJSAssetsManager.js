/**
 * Managing & creating assets using ThreeJS
 */
define([
    'ash',
    'three'
], function (Ash, THREE) {

    var AssetManager = Ash.Class.extend({
        constructor: function (options) {
            this.options = options || {};
        },

        /**
        * Loads all assets
        */
        loadAssets: function (callback) {
            // no assets to load yet, just delay 0.5s
            window.setTimeout(function () {
                if (callback) {
                    callback();
                }
            }, 1000);
        },

        /**
         * Creates an asteroid shapes object
         */
        createAsteroidsShape: function (radius, options) {
            // create sphere & material
            var geometry = new THREE.IcosahedronGeometry(radius, 0);
            var material = new THREE.MeshLambertMaterial({
                color: 0x9B59B6,
                emissive: 0x9B59B6,
                ambient: 0xFFFFFF,
                wireframe: false
            });

            // create mesh
            return new THREE.Mesh(geometry, material);
        },

        /**
         * Creates the space ship shape object
         */
        createSpaceShipShape: function (options) {
            // create sphere & material
            var geometry = this._createPyramidGeometry(15);
            var material = new THREE.MeshLambertMaterial({
                color: 0xE74C3C,
                emissive: 0xE74C3C,
                ambient: 0xFFFFFF,
                wireframe: false
            });

            // create mesh
            var shipMesh = new THREE.Mesh(geometry, material);
            //shipMesh.scale.y = 2.0;

            return shipMesh;
        },

        /**
         * Create a bullet shape
         */
        createBulletShape: function (options) {
            // create sphere & material
            var geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
            var material = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF
            });

            // create mesh
            return new THREE.Mesh(geometry, material);
        },

        /**
        * Creates pyramid like shaped geometry for the spaceship
        * @internal
        */
        _createPyramidGeometry: function (radius, detail) {
            var vertices = [
                [ -1,  1,  1 ], [ -1, 1, -1 ], [ -1, -1, -1 ], [ -1, -1, 1 ],
                [ 3,  0,  0 ]
            ];

            var faces = [
                [ 4, 0, 3 ], [ 4, 1, 0 ], [ 4, 2, 1 ], [ 4, 3, 2 ],
                [ 0, 1, 2], [ 2, 3, 0 ]
            ];

            var geometry = new THREE.PolyhedronGeometry(vertices, faces,
                radius, detail);
            var matrix = new THREE.Matrix4()
                .makeScale(1, 1, 0.5);
            geometry.applyMatrix(matrix);

            return geometry;
        }
    });

    return AssetManager;
});
