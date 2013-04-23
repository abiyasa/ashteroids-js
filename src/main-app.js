require([
    'jquery',
    'fillsnfixes',
    'utils/keypoll',
    'utils/ScreenManager',
    'game/screens/IntroScreen',
    'game/screens/MainScreen',
    'game/screens/PlayScreen'
], function($, Fixes, KeyPoll, ScreenManager, IntroScreen, MainScreen, PlayScreen) {
    'use strict';

    // for managing our screens
    var screenManager = new ScreenManager({
        el: $('#screen')
    });

    // the screen event, which will trigger screen changes
    var onChangeScreen = function (screenName) {
        console.log('screen event happens. detail=', screenName);

        switch (screenName) {
        case 'intro':
            showIntroScreen();
            break;

        case 'main':
            showMainScreen();
            break;

        case 'play':
            showPlayScreen();
            break;
        }
    };

    // init & diplays an allocated screen
    var displayScreen = function (theScreen) {
        theScreen.on('changeScreen', onChangeScreen);
        screenManager.showScreen(theScreen);
    };

    var showIntroScreen = function () {
        displayScreen(new IntroScreen());
    };

    var showMainScreen = function () {
        var newScreen = new MainScreen();
        displayScreen(newScreen);
    };

    var showPlayScreen = function () {
        var newScreen = new PlayScreen();
        displayScreen(newScreen);
        newScreen.startGame();
    };

    // some polyfills and additions to base javascript classes
    Fixes.initialise();

    // init keyboard poll
    KeyPoll.initialise(window);

    // start!
    onChangeScreen('intro');
});
