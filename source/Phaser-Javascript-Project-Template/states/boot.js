// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    //selectedTerritory: {},

    players: [],
    territories: [],
    continents: [],
    currentPlayer: [],
    cards: [],
    usedCards: [],
    conqueredTerritory: false,

    maxArmiesToAssign: 0,
    prePlacedArmies: 0,

    attackingTerritory: null,
    defendingTerritory: null,
    arrow: null,
    fortified: false,

    gameState: 0,

    NEW_GAME: 0,
    TRADE_CARDS: 1,
    PLACE_ARMIES: 2,
    ATTACK: 3,
    FORTIFYING: 4,
    END_TURN: 5,
    GAME_OVER: 6,

    MAX_PLAYERS: 6,
    MAX_CARDS: 44,

    COLORS: ['blue', 'red', 'green', 'brown', 'purple', 'darkorange'],
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



