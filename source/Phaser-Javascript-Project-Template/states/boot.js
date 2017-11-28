// Boot will take care of initializing a few settings,

// declare the object that will hold all game states
var GameStates = {
    //quite common to add game variables/constants in here
    NEW_GAME: 0,
    TRADE_CARDS: 1,
    PLACE_ARMIES: 2,
    ATTACK: 3,
    //DEFEND: 4,
    FORTIFYING: 4,
    END_TURN: 5,

    MAX_PLAYERS: 6,
    MAX_CARDS: 44,

    COLORS: ['blue', 'red', 'green', 'yellow', 'purple', 'darkorange'],
    HEXA_COLORS: [0x0000FF, 0xFF0000, 0x008000, 0xFFFF00, 0x800080, 0xFF8C00]
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
        setTerritories();
        

        this.state.start('Preloader');
    }
};

function setTerritories() {
    territories.push(new Territory('Bilgaard', 370, 56));
    territories.push(new Territory('Havankpark', 462, 12));
    territories.push(new Territory('Vrijheidswijk', 488, 62));
    territories.push(new Territory('Blitsaerd', 606, 13));
    territories.push(new Territory('Camminghaburen', 712, 123));
    territories.push(new Territory('Heechterp', 574, 94));
    territories.push(new Territory('Schieringen', 592, 155));
    territories.push(new Territory('Schepenbuurt', 580, 245));
    territories.push(new Territory('Wielenpôlle', 572, 306));
    territories.push(new Territory('De Hemrik', 726, 260));
    territories.push(new Territory('Aldlân', 540, 370));
    territories.push(new Territory('Zuiderburen', 630, 410));
    territories.push(new Territory('Goutum', 470, 440));
    territories.push(new Territory('Nijlân', 300, 370));
    territories.push(new Territory('Achter de Hoven', 495, 269));
    territories.push(new Territory('Huizum-oost', 470, 326));
    territories.push(new Territory('Huizum-west', 360, 308));
    territories.push(new Territory('Oranjewijk', 435, 244));
    territories.push(new Territory('Cambuur', 500, 158));
    territories.push(new Territory('Binnenstad', 388, 208));
    territories.push(new Territory('Bloemenbuurt', 440, 118));
    territories.push(new Territory('Transvaalwijk', 365, 127));
    territories.push(new Territory('Vogelwijk', 293, 154));
    territories.push(new Territory('Valeriuskwartier', 263, 116));
    territories.push(new Territory('Westeinde', 197, 125));
    territories.push(new Territory('Vossenparkwijk', 290, 221));
    territories.push(new Territory('Industrieterrein-west', 198, 260));
}