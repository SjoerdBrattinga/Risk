// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    selectedTerritory: {},
    attackingTerritory: null,
    defendingTerritory: null,
    gameState: 0,

    NEW_GAME: 0,
    TRADE_CARDS: 1,
    PLACE_ARMIES: 2,
    ATTACK: 3,
    //DEFEND: 4,
    FORTIFYING: 4,
    END_TURN: 5,

    MAX_PLAYERS: 6,
    MAX_CARDS: 44,

    //GAME_TEXT: '',
    COLORS: ['blue', 'red', 'green', 'brown', 'purple', 'darkorange'],
    //HEXA_COLORS: [0x0000FF, 0xFF0000, 0x008000, 0x663300, 0x800080, 0xFF8C00]
    HEXA_COLORS: ['#0000FF', '#FF0000', '#008000', '#663300', '#800080', '#FF8C00']
};

GameStates.Boot = function (game) {  //declare the boot state

};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
        
    },
    create: function () {
        this.state.start('Preloader');
    }
};



