define([
    'ash'
], function (Ash) {
    var TickProvider = Ash.Class.extend({
        previousTime: 0,
        ticked: new Ash.Signals.Signal(),
        request: null,
        stats: null,

        constructor: function (stats) {
            this.stats = stats;
        },

        start: function () {
            this.request = window.requestAnimationFrame(this.tick.bind(this));
        },

        stop: function () {
            window.cancelAnimationFrame(this.request);
        },

        add: function (listener, context) {
            this.ticked.add(listener, context);
        },

        remove: function (listener, context) {
            this.ticked.remove(listener, context);
        },

        removeAll: function () {
            this.ticked.removeAll();
        },

        tick: function (timestamp) {
            if (this.stats) {
                this.stats.begin();
            }

            timestamp = timestamp || Date.now();
            var tmp = this.previousTime || timestamp;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            window.requestAnimationFrame(this.tick.bind(this));

            if (this.stats) {
                this.stats.end();
            }
        }
    });

    return TickProvider;
});
