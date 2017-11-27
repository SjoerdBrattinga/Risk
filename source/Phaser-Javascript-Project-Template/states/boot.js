// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    NEW_GAME: 0,
    TRADE_CARDS: 1,
    PLACE_ARMIES: 2,
    ATTACK: 3,
    DEFEND: 4,
    FORTIFYING: 5,

    MAX_PLAYERS: 6,
    MAX_CARDS: 44,

    COLORS: ['blue', 'red', 'green', 'yellow', 'purple', 'darkorange']
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
        //setTerritories();
        addPlayer(0, 'a', 'blue');
        addPlayer(0, 'b', 'green');
        addPlayer(0, 'c', 'blue');
        addPlayer(0, 'd', 'green');
        addPlayer(0, 'e', 'blue');
        addPlayer(0, 'f', 'green');

        this.state.start('Preloader');
    }
};

function setTerritories() {
    //territories.push(new Territory('Bilgaard'));
    //territories.push(new Territory('Vrijheidswijk'));
}