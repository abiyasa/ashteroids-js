/**
 * Renderer system using Three.js
 */
define([
    'ash', 'three'
], function (Ash, THREE) {
    var RenderSystem = Ash.System.extend({

        constructor: function (canvas) {
            var viewportWidth = canvas.width;
            var viewportHeight = canvas.height;

            var scene = this.scene = new THREE.Scene();

            // setup camera
            var camera = this.camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 1, 10000);
            camera.position.z = 600;
            scene.add(camera);

            this.setupDummyStuff();

            // prepare renderer
            var renderer = this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(viewportWidth, viewportHeight);

            return this;
        },

        // setup dummy stuff just to know if this renderer is working
        setupDummyStuff: function () {
            // create sphere & material
            var geometry = new THREE.SphereGeometry(200, 16, 16);
            var material = new THREE.MeshLambertMaterial({
                color: 0x009ee1,
                emissive: 0x009ee1,
                ambient: 0x009ee1,
                wireframe: false
            });

            // create mesh
            var mesh = this.mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);

            // create lights
            var light = new THREE.PointLight(0xFFFFFF);
            light.position.x = 0;
            light.position.y = 100;
            light.position.z = 300;
            this.scene.add(light);
        },

        update: function (time) {
            // rotate dummy mesh
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.02;

            this.renderer.render(this.scene, this.camera);
        }
    });

    return RenderSystem;
});
