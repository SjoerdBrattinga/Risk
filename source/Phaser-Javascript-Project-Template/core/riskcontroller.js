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
//var gameState = 0;
//var attackingTerritory = {};
//var defendingTerritory = {};
var conqueredTerritory;
var playing = false;
var riskGame;
var numberOfEyesThrown;


function newGame(game) {
    riskGame = game;
    if (players.length < 2) return;

    if (GameStates.gameState === GameStates.NEW_GAME) {
        //assignTerritories();
        //cards = shuffleCards();
        var startingArmies = 30;

        for (var i = 0; i < players.length; i++) {
            players[i].numberOfArmies = startingArmies;
        }

        assignArmiesToTerritories(startingArmies);

        currentPlayer = getRandomPlayer();
        setCurrentPlayerText();
        currentPlayer.setArmiesToPlace();
        GameStates.gameState = GameStates.PLACE_ARMIES;
        setInstructionText();
        conqueredTerritory = false;
        playing = true;

        //turn();
    }


    //addPlayers
    //setTerritories
    //setContinents
    //setCurrentPlayer
    //setCards

}

function setCurrentPlayerText() {
    currentPlayerText.setText(currentPlayer.name + '\'s turn');
    currentPlayerText.addColor(currentPlayer.getHexaColor(), 0);
}

function setInstructionText() {
    if (GameStates.gameState === GameStates.PLACE_ARMIES) {
        //console.log('place armies');
        instructionText.setText('Place armies: ' + currentPlayer.armiesToPlace);
    }
    if (GameStates.gameState === GameStates.ATTACK) {
        //console.log('attack');
        if (GameStates.attackingTerritory && GameStates.defendingTerritory === null)
            instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ...' );
        else if (GameStates.attackingTerritory && GameStates.defendingTerritory) 
            instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ' + GameStates.defendingTerritory.name);
        else if (GameStates.attackingTerritory === null && GameStates.defendingTerritory)
            instructionText.setText('Attack: ... vs ' + GameStates.defendingTerritory.name);
        else
            instructionText.setText('Attack');
    }
    if (GameStates.gameState === GameStates.FORTIFYING) {
        console.log('fortifying');
        instructionText.setText('Fortify');
    }
    
}

function assignArmiesToTerritories(startingArmies) {
    for (var i = 0; i < players.length; i++) {
        var playerTerritories = players[i].getTerritoriesOwned();
        var armies = startingArmies;

        var count = 0;
        for (var j = 0; j < playerTerritories.length; j++) {

            if (j === playerTerritories.length - 1) {
                console.log(count);
                playerTerritories[j].addArmies(armies);
                count += armies;
                console.log(count);
                break;
            }

            var maxArmiesToAssign = armies / (playerTerritories.length - j);
            maxArmiesToAssign = Math.round(maxArmiesToAssign);
            var armiesToAssign = Math.round(Math.random() * maxArmiesToAssign) + 1;

            playerTerritories[j].addArmies(armiesToAssign);
            count += armiesToAssign;
            armies -= armiesToAssign;
        }
    }
}


function turn() {
    if (GameStates.gameState === GameStates.PLACE_ARMIES) {
        console.log('place armies');

    }
    if (GameStates.gameState === GameStates.ATTACK) {
        console.log('attack');

    }
    if (GameStates.gameState === GameStates.FORTIFYING) {
        console.log('fortifying');

    }
    if (GameStates.gameState === GameStates.END_TURN) {
        console.log('end turn');


    }

}

function endTurn() {
    setCurrentPlayer();
    setCurrentPlayerText();
    turn();
}


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

function placeArmies() {
    if (currentPlayer.name === selectedTerritory.owner.name)
        selectedTerritory.addArmies();
}

function attackTerritory() {
    //var attackTerritories = players[0].getTerritoriesOwned();
    //attackingTerritory = attackTerritories[0];
    console.log('attacker', GameStates.attackingTerritory);
    //var defenderTerritories = players[1].getTerritoriesOwned();
    //defendingTerritory = defenderTerritories[0];
    console.log('defender', GameStates.defendingTerritory);

    if (GameStates.attackingTerritory !== undefined && GameStates.defendingTerritory !== undefined) {
        if (GameStates.attackingTerritory !== null && GameStates.defendingTerritory !== null) {
            if (GameStates.attackingTerritory.armies > 1) {
                var attackingPlayer = GameStates.attackingTerritory.getOwner();
                var defendingPlayer = GameStates.defendingTerritory.getOwner();

                var result = battle();

                GameStates.defendingTerritory.removeArmies(result.defendingArmiesToRemove);
                defendingPlayer.removeArmies(result.defendingArmiesToRemove);

                GameStates.attackingTerritory.removeArmies(result.attackingArmiesToRemove);
                attackingPlayer.removeArmies(result.attackingArmiesToRemove);

                if (GameStates.defendingTerritory.armies === 0) {
                    conqueredTerritory = true;
                    GameStates.defendingTerritory.setOwner(attackingPlayer);
                    console.log(attackingPlayer.name + ' conquered ' + GameStates.defendingTerritory.name + '!');
                }
            } else {
                console.log('To attack a territory you need at least 2 armies!');
            }
        }
    }
}

function battle() {
    var battleResult = {
        attackingArmiesToRemove: 0,
        defendingArmiesToRemove: 0
    };

    var numberOfAttackDice = getMaxAttackDice();
    var numberOfDefenseDice = getMaxDefenceDice();

    var attackResult = rollDice(numberOfAttackDice);
    var defenseResult = rollDice(numberOfDefenseDice);

    for (var i = 0; i < defenseResult.length; i++) {
        if (numberOfAttackDice === 0) {
            console.log('Can\'t attack with 1 army!');
            break;
        }
        if (battleResult.defendingArmiesToRemove === GameStates.defendingTerritory.armies) {
            console.log('Attacker won');
            break;
        }
        if (attackResult[i] > defenseResult[i]) {
            console.log('attack won');
            battleResult.defendingArmiesToRemove++;
        } else {
            console.log('defense won');
            battleResult.attackingArmiesToRemove++;
        }
    }
    return battleResult;
}

function rollDice(numberOfDice) {
    var result = [];

    for (var i = 0; i < numberOfDice; i++) {
        result.push(rollDie());
    }

    return result.sort(function (a, b) { return b - a; });
}

function getMaxAttackDice() {
    var maxAttackDice;

    if (GameStates.attackingTerritory.armies > 3) {
        maxAttackDice = 3;
    } else if (GameStates.attackingTerritory.armies === 3) {
        maxAttackDice = 2;
    } else if (GameStates.attackingTerritory.armies === 2) {
        maxAttackDice = 1;
    } else {
        maxAttackDice = 0;
    }

    return maxAttackDice;
}

function getMaxDefenceDice() {
    var maxDefenseDice;

    if (GameStates.defendingTerritory.armies >= 2) {
        maxDefenseDice = 2;
    } else if (GameStates.defendingTerritory.armies === 1) {
        maxDefenseDice = 1;
    } else {
        maxDefenseDice = 0;
    }

    return maxDefenseDice;
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

