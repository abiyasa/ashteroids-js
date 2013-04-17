/**
 * A trick for enabling requirejs build with jQuery from CDN
 * See https://www.nothing.ch/en/research/using-optimised-requirejs-combination-phonegap
 */

 /* globals $ */
define(function() {
    return $;
});
