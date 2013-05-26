/**
* Constants for systems prioritites
*/
define(function () {
    var SystemPriorities = {
        PRE_UPDATE: 1,
        UPDATE: 2,
        MOVE: 3,
        RESOLVE_COLLISIONS: 4,
        RENDER: 5
    };

    return SystemPriorities;
});
