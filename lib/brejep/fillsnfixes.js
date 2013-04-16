define(function () {
    'use strict';

    // Polyfill for requestAnimationFrame
    function fixRequestAnimationFrame() {
        window.requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element ) {
                return window.setTimeout(callback, 1000 / 60);
            };

        window.cancelAnimationFrame = window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.clearTimeout;
    }

    // Singleton!
    var fillsnfixes = {
        VERSION : '0.1.0',

        initialise: function() {
            fixRequestAnimationFrame();
        }
    };

    return fillsnfixes;
});
