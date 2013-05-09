/**
 * Renderer system using Three.js
 * Also manage the camera & scene lights
 */
define([
    'ash', 'three', 'nodes/RenderNode'
], function (Ash, THREE, RenderNode) {
    var RenderSystem = Ash.System.extend({
        nodes: null,
        scene: null,

        constructor: function (canvas) {
            var viewportWidth = canvas.width;
            var viewportHeight = canvas.height;

            var scene = this.scene = new THREE.Scene();

            // setup camera
            var camera = this.camera = new THREE.PerspectiveCamera(75, viewportWidth / viewportHeight, 10, 1000);
            camera.position.z = 300;
            camera.position.x = viewportWidth / 2;
            camera.position.y = (viewportHeight / 2) - 100;
            camera.lookAt(new THREE.Vector3(viewportWidth / 2, (viewportHeight / 2) - 40, 0));
            scene.add(camera);

            // create lights
            var light = new THREE.DirectionalLight(0xFFFFFF);
            light.position.set(0, 0, 1).normalize();
            this.scene.add(light);

            this.createBGPlane(viewportWidth, viewportHeight);

            // prepare renderer
            var renderer = this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
            renderer.setSize(viewportWidth, viewportHeight);

            return this;
        },

        // create plane for BG
        createBGPlane: function (width, height) {
            var geometry = new THREE.PlaneGeometry(width, height, 4, 4);
            var material = new THREE.MeshLambertMaterial({
                color: 0x34495E
            });

            // create mesh
            var planeMesh = new THREE.Mesh(geometry, material);
            planeMesh.position.x = width / 2;
            planeMesh.position.y = height / 2;
            planeMesh.position.z = -50;

            this.scene.add(planeMesh);
        },

        addToEngine: function (engine) {
            this.nodes = engine.getNodeList(RenderNode);
            for(var node = this.nodes.head; node; node = node.next) {
                this.addToDisplay(node);
            }
            this.nodes.nodeAdded.add(this.addToDisplay, this);
            this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
        },

        removeFromEngine: function (engine) {
            this.nodes = null;
        },

        addToDisplay: function (node) {
            this.scene.add(node.display.displayObject);
            node.display.displayObject.position.z = 0;
        },

        removeFromDisplay: function (node) {
            this.scene.remove(node.display.displayObject);
        },

        update: function (time) {
            var node, position, displayObject;

            for (node = this.nodes.head; node; node = node.next) {
                displayObject = node.display.displayObject;
                position = node.position;
                displayObject.position.x = position.position.x;
                displayObject.position.y = position.position.y;

                displayObject.rotation.z = position.rotation;
            }

            this.renderer.render(this.scene, this.camera);
        }
    });

    return RenderSystem;
});
