/**
 * A trick for enabling requirejs build with library from CDN
 * See https://www.nothing.ch/en/research/using-optimised-requirejs-combination-phonegap
 */

 /* globals createjs */
define(function() {
    return createjs;
});
