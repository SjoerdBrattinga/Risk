// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    STATE_NEW_GAME: 0,
    STATE_TRADE_CARDS: 1,
    STATE_PLACE_ARMIES: 2,
    STATE_ATTACK: 3,
    STATE_DEFEND: 4,
    STATE_FORTIFYING: 5,

    MAX_PLAYERS: 6,
    MAX_CARDS: 44
};

GameStates.Boot = function (game) {  //declare the boot state

};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
        
    },
    create: function () {
        // setup game environment
        // scale, input etc..
        //this.scale.setGameSize(2000, 2000);
        // call next state
        this.state.start('Preloader');
    }
};

