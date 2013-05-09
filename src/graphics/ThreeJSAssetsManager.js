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
            //var geometry = new THREE.TetrahedronGeometry (15);
            var geometry = new THREE.CubeGeometry(15, 5, 5, 1, 1, 1);
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
        }

    });

    return AssetManager;
});
