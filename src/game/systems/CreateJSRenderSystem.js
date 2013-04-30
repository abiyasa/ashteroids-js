/**
 * Renderer system using CreateJS/EaselJS
 */
define([
    'ash', 'game/nodes/render', 'easel'
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

        /*
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
        */

        addToDisplay: function (node) {
            // Intentionally left blank
        },

        removeFromDisplay: function (node) {
            // Intentionally left blank
        }

        /*
        update: function (time) {
            var node,
                position,
                display,
                graphic;

            this.context.save();
            this.context.translate(0,0);
            this.context.rotate(0);
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            for (node = this.nodes.head; node; node = node.next) {
                display = node.display;
                graphic = display.graphic;
                position = node.position;
                graphic.x = position.position.x;
                graphic.y = position.position.y;
                graphic.rotation = position.rotation;
                graphic.draw();
            }
            this.context.restore();
        }
        */
    });

    return RenderSystem;
});
