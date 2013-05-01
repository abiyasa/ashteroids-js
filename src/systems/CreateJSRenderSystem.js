/**
 * Renderer system using CreateJS/EaselJS
 */
define([
    'ash', 'game/nodes/CreateJSRender', 'easel'
], function (Ash, RenderNode, createjs) {
    var RenderSystem = Ash.System.extend({
        nodes: null,
        stage: null,

        constructor: function (canvas) {
            this.stage = new createjs.Stage(canvas);

            // NOTE: dummy to test stage
            var g = new createjs.Graphics();
            g.setStrokeStyle(1);
            g.beginStroke(createjs.Graphics.getRGB(255,255,255, 0.7));
            g.drawCircle(0,0, 100);

            var circle = new createjs.Shape(g);
            circle.x = canvas.width / 2;
            circle.y = canvas.height / 2;

            this.stage.addChild(circle);
            this.stage.update();

            return this;
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
            this.stage.addChild(node.display.displayObject);
        },

        removeFromDisplay: function (node) {
            this.stage.removeChild(node.display.displayObject);
        },

        update: function (time) {
            var node, position, displayObject;

            for (node = this.nodes.head; node; node = node.next) {
                displayObject = node.display.displayObject;
                position = node.position;
                displayObject.x = position.position.x;
                displayObject.y = position.position.y;

                // createJS uses degree
                displayObject.rotation = position.rotation * 180 / Math.PI;
            }

            this.stage.update();
        }
    });

    return RenderSystem;
});
