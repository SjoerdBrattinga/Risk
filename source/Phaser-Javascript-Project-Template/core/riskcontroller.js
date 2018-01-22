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
var conqueredTerritory;
var playing = false;
var riskGame;
var numberOfEyesThrown;

function newGame(game) {
    riskGame = game;
    if (players.length < 2) return;

    if (gameState === GameStates.NEW_GAME) {
        //assignTerritories();
        //cards = shuffleCards();
        var startingArmies = 30;

        for (var i = 0; i < players.length; i++) {
            players[i].addArmies = startingArmies;
        }

        currentPlayer = getRandomPlayer();
        gameState = GameStates.PLACE_ARMIES;
        conqueredTerritory = false;

        playing = true;
        turn();
    }


    //addPlayers
    //setTerritories
    //setContinents
    //setCurrentPlayer
    //setCards

}


function turn() {
    if (gameState === GameStates.PLACE_ARMIES) {
        console.log(currentPlayer.name);
        console.log('place armies');

    }
    if (gameState === GameStates.ATTACK) {
        console.log('attack');

    }
    if (gameState === GameStates.FORTIFYING) {
        console.log('fortifying');

    }
    if (gameState === GameStates.END_TURN) {
        console.log('end turn');


    }

}

function endTurn() {
    setCurrentPlayer();
    turn();
}

$(document).ready(function () {
    $('#test_btn').click(function () {

        if (gameState === 4) gameState = 1;
        else gameState++;
    });
});

function setGameState() {

}

function getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
}

function getRandomTerritory() {
    return territories[Math.floor(Math.random() * territories.length)];
}

function setCurrentPlayer() {
    var currentIndex = players.indexOf(currentPlayer);

    if (currentIndex !== players.length - 1)
        currentPlayer = players[currentIndex + 1];
    else
        currentPlayer = players[0];
}

//function shuffleCards() {
//    for (var i = 0; i < shuffleCnt; i++) {
//        var rndNo = getRandomInt(1, 52);
//        var card = cards[i];
//        cards[i] = cards[rndNo];
//        cards[rndNo] = card;
//    }
//}

function addPlayer(type, name, color) {
    var player = new Player(type, name, color);
    players.push(player);
    return player;
}

function removePlayer(name) {
    if (players.length > 0) {
        for (var i = 0; i < players.length; i++) {
            if (players[i].name === name) {
                players.splice(i, 1);
                break;
            }
        }
    } else {
        console.warn('No player to remove!');
    }
}

function placeArmies(armiesToPlace) {

}

function attackTerritory(attacker, defender) {
    if (attacker !== undefined && defender !== undefined) {
        if (attacker !== null && defender !== null) {
            var attackingPlayer = attacker.getOwner();
            var defendingPlayer = defender.getOwner();


            var result = battle();

            if (result) {
                defender.removeArmies(10);
            }
            if (defender.getNumberOfArmies === 0) {
                conqueredTerritory = defender;
                conqueredTerritory.setOwner(attackingPlayer);
            }
        }

    }
}


function battle() {
    debugger;
    attacker = territories[0];
    attacker.addArmies(3);
    defender = territories[1];
    defender.addArmies(1);
    var numberOfAttackDice = getMaxAttackDice();
    var numberOfDefenseDice = getMaxDefenceDice();
    var attackResult = rollDice(numberOfAttackDice);
    var defenseResult = rollDice(numberOfDefenseDice);

    for (var i = 0; i < defenseResult.length; i++) {
        if (attackResult[i] > defenseResult[i]) {
            console.log('attack won');
            defender.removeArmies(numberOfDefenseDice);

        } else {
            console.log('defense won');
            attacker.removeArmies(numberOfDefenseDice);
        }

    }
    return attackResult, defenseResult;
}

function rollDice(numberOfDice) {
    //TO DO: Logic, sort the array of both attacking and defending side.
    //       Check which die has a higher number (who won).
    var result = [];
    for (var i = 0; i < numberOfDice; i++) {
        result.push(rollDie());
    }
    return result.sort(function (a, b) { return b - a });
}

function getMaxAttackDice() {
    var maxAttackDice;

    if (attacker.getNumberOfArmies() > 2) {
        maxAttackDice = 3;
    }
    else if (attacker.getNumberOfArmies() === 2) {
        maxAttackDice = 2;
    }
    else {
        maxAttackDice = 1;
    }

    return maxAttackDice;
}

function getMaxDefenceDice() {
    var maxDefenseDice;

    if (defender.getNumberOfArmies() >= 2) {
        maxDefenseDice = 2;
    } else {
        maxDefenseDice = 1;
    }

    return maxDefenseDice;
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

