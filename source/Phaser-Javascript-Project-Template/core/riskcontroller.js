//var STATE_NEW_GAME = 0;
//var STATE_TRADE_CARDS = 1;
//var STATE_PLACE_ARMIES = 2;
//var STATE_ATTACK = 3;
//var STATE_DEFEND = 4;
//var STATE_FORTIFYING = 5;
//var MAX_PLAYERS = 6;
//var MAX_CARDS = 44;

var players = [];
var territories = [];
var continents = [];
var currentPlayer = {};
var cards = [];
var usedCards = [];
var gameState = 0;
var attacker = {};
var defender = {};
var conqueredTerritory = false;

function newGame() {
    //addPlayers
    //setTerritories
    //setContinents
    //setCurrentPlayer
    //setCards

}

function addPlayer(type, name, color) {
    var player = new Player(type, name, color);
    players.add(player);
}