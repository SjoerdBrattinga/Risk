﻿//var STATE_NEW_GAME = 0;
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

function newGame() {
    if (players.length < 2) return;
    if (gameState === GameStates.NEW_GAME) {
        //cards = shuffleCards();
        var startingArmies = 30;

        for (var i = 0; i < players.length; i++) {
            players[i].addArmies = startingArmies;
        }

        currentPlayer = getRandomPlayer();
        gameState = GameStates.PLACE_ARMIES;
        conqueredTerritory = false;

        playing = true;
        startGame();
    }
    

    //addPlayers
    //setTerritories
    //setContinents
    //setCurrentPlayer
    //setCards

}

function startGame() {
    for (var i = 1; i < 6; i++) {
        if (GameStates.PLACE_ARMIES) {
            var armiesToPlace = currentPlayer.getNumberOfExtraArmies();

            
        }
    }  
  
}

function setGameState() {
    
}

function getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
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

function placeArmies() {
    
}

function attackTerritory(attacker, defender) {
    if (attacker !== undefined && defender !== undefined) {
        if (attacker !== null && defender !== null) {
            var attackingPlayer = attacker.getOwner();
            var defendingPlayer = defender.getOwner();


            var result = getBattleResult();

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

function getBattleResult() {
    var attackResult;
    var defenseResult;

    return true;
}

function rollAttackDice(numberOfDice) {
    if (numberOfDice === 1) {
        //do something
    }
    else if (numberOfDice === 2) {
        //do something
    }
    else if (numberOfDice === 3) {
        //do something
    }
}

function rollDefenceDice(numberOfDice) {
    if (numberOfDice === 1) {
        //do something
    }
    else if (numberOfDice === 2) {
        //do something
    }
}