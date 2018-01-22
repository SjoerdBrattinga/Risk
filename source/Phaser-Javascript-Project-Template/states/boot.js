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

    COLORS: ['blue', 'red', 'green', 'brown', 'purple', 'darkorange'],
    HEXA_COLORS: [0x0000FF, 0xFF0000, 0x008000, 0x663300, 0x800080, 0xFF8C00]
};

GameStates.Boot = function (game) {  //declare the boot state

};

GameStates.Boot.prototype = {
    preload: function () {
        // load assets to be used later in the preloader e.g. for loading screen / splashscreen
        this.load.image('preloaderBar', 'assets/preloader-bar.png');
        
    },
    create: function () {
        setTerritories(this.game);
        this.state.start('Preloader');
    }
};

function setTerritories(game) {

    territories.push(new Territory(game, 'Bilgaard', 370, 56));
    territories.push(new Territory(game, 'Havankpark', 462, 12));
    territories.push(new Territory(game, 'Vrijheidswijk', 488, 62));
    territories.push(new Territory(game, 'Blitsaerd', 606, 13));
    territories.push(new Territory(game, 'Camminghaburen', 712, 123));
    territories.push(new Territory(game, 'Heechterp', 574, 94));
    territories.push(new Territory(game, 'Schieringen', 592, 155));
    territories.push(new Territory(game, 'Schepenbuurt', 580, 245));
    territories.push(new Territory(game, 'Wielenpôlle', 572, 306));
    territories.push(new Territory(game, 'De Hemrik', 726, 260));
    territories.push(new Territory(game, 'Aldlân', 540, 370));
    territories.push(new Territory(game, 'Zuiderburen', 630, 410));
    territories.push(new Territory(game, 'Goutum', 470, 440));
    territories.push(new Territory(game, 'Nijlân', 300, 370));
    territories.push(new Territory(game, 'Achter de Hoven', 495, 269));
    territories.push(new Territory(game, 'Huizum-oost', 470, 326));
    territories.push(new Territory(game, 'Huizum-west', 360, 308));
    territories.push(new Territory(game, 'Oranjewijk', 435, 244));
    territories.push(new Territory(game, 'Cambuur', 500, 158));
    territories.push(new Territory(game, 'Binnenstad', 388, 208));
    territories.push(new Territory(game, 'Bloemenbuurt', 440, 118));
    territories.push(new Territory(game, 'Transvaalwijk', 365, 127));
    territories.push(new Territory(game, 'Vogelwijk', 293, 154));
    territories.push(new Territory(game, 'Valeriuskwartier', 263, 116));
    territories.push(new Territory(game, 'Westeinde', 197, 125));
    territories.push(new Territory(game, 'Vossenparkwijk', 290, 221));
    territories.push(new Territory(game, 'Industrieterrein-west', 198, 260));
    //for (var i = 0; i < territories.length; i++) {
    //    territories[i].addGraphics();
    //}
}

for (var i = 0; i < nrOfDice; i++) {
    rollDie();
}