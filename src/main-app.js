require([
    'jquery',
    'fillsnfixes',
    'utils/keypoll',
    'utils/ScreenManager',
    'game/screens/IntroScreen',
    'game/screens/MainScreen',
    'game/screens/SettingsScreen',
    'game/screens/PlayScreen'
], function($, Fixes, KeyPoll, ScreenManager, IntroScreen,
    MainScreen, SettingsScreen, PlayScreen) {
    'use strict';

    // for managing our screens
    var screenManager = new ScreenManager({
        el: $('#screen')
    });

    // init & diplays an allocated screen
    var _showScreen = function (theScreen) {
        theScreen.on('changeScreen', onChangeScreen);
        screenManager.showScreen(theScreen);
    };

    // the screen event, which will trigger screen changes
    var onChangeScreen = function (screenName) {
        console.log('screen event happens. detail=', screenName);

        var newScreen;
        switch (screenName) {
        case 'intro':
            newScreen = new IntroScreen();
            break;

        case 'main':
            newScreen = new MainScreen();
            break;

        case 'settings':
            newScreen = new SettingsScreen();
            break;

        case 'play':
            newScreen = new PlayScreen();
            break;
        }

        if (newScreen) {
            _showScreen(newScreen);
        }
    };

    // some polyfills and additions to base javascript classes
    Fixes.initialise();

    // init keyboard poll
    KeyPoll.initialise(window);

    // start!
    onChangeScreen('intro');
});
