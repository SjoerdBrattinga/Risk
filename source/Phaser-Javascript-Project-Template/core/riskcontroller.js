var players = [];
var territories = [];
var continents = [];
var currentPlayer = {};
var cards = [];
var usedCards = [];

var conqueredTerritory;
var playing = false;
var game;
var numberOfEyesThrown;

var maxArmiesToAssign;
var minArmiesToAssign;
var prePlacedArmies;

function newGame(thisGame) {
    game = thisGame;
    if (players.length < 2) return;

    if (GameStates.gameState === GameStates.NEW_GAME) {
        
        //cards = shuffleCards();
        var startingArmies = 30;

        for (var i = 0; i < players.length; i++) {
            players[i].numberOfArmies = startingArmies;
        }

        assignArmiesToTerritories(startingArmies);

        //currentPlayer = getRandomPlayer();
        currentPlayer = players[0];
        
        conqueredTerritory = false;
        playing = true;

        newTurn();
    }
}

function newTurn() {
    setCurrentPlayerText();
    currentPlayer.setArmiesToPlace();
    moveArmyBtn.visible = false;

    if (currentPlayer.type !== 0) {
        continueBtn.visible = true;
        if (currentPlayer.type === 1) {
            placeArmiesAiEasy();
        }
        if (currentPlayer.type === 2) {
            placeArmiesAiAverage();
        }
        if (currentPlayer.type === 3) {
            placeArmiesAiHard();
        }
        GameStates.gameState = GameStates.END_TURN;

    } else {
        continueBtn.visible = false;
        GameStates.gameState = GameStates.PLACE_ARMIES;
    }

    setInstructionText();
}

function assignTerritories() {
    shuffle(territories);

    var count = 0;
    for (var i = 0; i < territories.length; i++) {
        territories[i].setOwner(players[count]);
        count++;
        if (count === players.length) count = 0;
    }
}

function setCurrentPlayerText() {
    currentPlayerText.setText(currentPlayer.name + '\'s turn');
    currentPlayerText.addColor(currentPlayer.getHexaColor(), 0);
}

function setInstructionText() {
    if (GameStates.gameState === GameStates.PLACE_ARMIES) {
        instructionText.setText('Place armies: ' + currentPlayer.armiesToPlace);
    } else if (GameStates.gameState === GameStates.ATTACK) {
        if (GameStates.attackingTerritory && GameStates.defendingTerritory === null)
            instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ...');
        else if (GameStates.attackingTerritory && GameStates.defendingTerritory)
            instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ' + GameStates.defendingTerritory.name);
        else if (GameStates.attackingTerritory === null && GameStates.defendingTerritory)
            instructionText.setText('Attack: ... vs ' + GameStates.defendingTerritory.name);
        else
            instructionText.setText('Attack');
    } else if (GameStates.gameState === GameStates.FORTIFYING) {
        console.log('fortifying');
        if (GameStates.attackingTerritory && GameStates.defendingTerritory === null) {
            instructionText.setText('Moving from: ' + GameStates.attackingTerritory.name);
        } else if (GameStates.attackingTerritory && GameStates.defendingTerritory) {
            instructionText.setText('Moving from: ' + GameStates.attackingTerritory.name + ' to ' + GameStates.defendingTerritory.name);
        } else if (GameStates.attackingTerritory === null && GameStates.defendingTerritory) {
            instructionText.setText('Moving from: ... to ' + GameStates.defendingTerritory.name);
        } else {
            instructionText.setText('Fortify');
        }
    } else if (GameStates.gameState === GameStates.END_TURN) {
        instructionText.setText('End turn');
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
            if (armiesToAssign < 1) {
                armiesToAssign = 1;
            }
            playerTerritories[j].addArmies(armiesToAssign);
            count += armiesToAssign;
            armies -= armiesToAssign;
        }
    }
}

function getNumberOfArmiesToMove(attackingTerritory) {
    maxArmiesToAssign = attackingTerritory.armies - 1;
    minArmiesToAssign = 0;

    if (currentPlayer.type === 0) {
        moveArmyBtn.visible = true;
        $('#form2').show();
    }
}

$(function () {
    $("input[type='number']").prop('min', minArmiesToAssign);
    $("input[type='number']").prop('max', maxArmiesToAssign);
});

function moveArmies(territory1, territory2, armiesToMove) {
    if (territory1.armies - armiesToMove >= 1) {
        territory1.removeArmies(armiesToMove);
        territory2.addArmies(armiesToMove);
    } else {
        console.log('Can not move more than ' + territory1.armies + ' - 1');
    }
}

function endTurn() {
    setCurrentPlayer();
    newTurn();
}

function setCurrentPlayer() {
    var currentIndex = players.indexOf(currentPlayer);

    if (currentIndex !== players.length - 1)
        currentPlayer = players[currentIndex + 1];
    else
        currentPlayer = players[0];
}


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
    console.log('attacker', GameStates.attackingTerritory);
    console.log('defender', GameStates.defendingTerritory);
    var result;
    if (GameStates.attackingTerritory !== undefined && GameStates.defendingTerritory !== undefined) {
        if (GameStates.attackingTerritory !== null && GameStates.defendingTerritory !== null) {
            if (GameStates.attackingTerritory.armies > 1) {
                var attackingTerritory = GameStates.attackingTerritory;
                var defendingTerritory = GameStates.defendingTerritory;
                var attackingPlayer = attackingTerritory.getOwner();
                var defendingPlayer = defendingTerritory.getOwner();

                checkBorderTerritories(attackingTerritory, defendingTerritory);

                result = battle();
                result.conqueredTerritory = false;
                GameStates.defendingTerritory.removeArmies(result.defendingArmiesToRemove);
                defendingPlayer.removeArmies(result.defendingArmiesToRemove);

                GameStates.attackingTerritory.removeArmies(result.attackingArmiesToRemove);
                attackingPlayer.removeArmies(result.attackingArmiesToRemove);

                if (defendingTerritory.armies === 0) {
                    setInstructionText();
                    conqueredTerritory = true;
                    attackBtn.visible = false;

                    defendingTerritory.setOwner(attackingPlayer);
                    console.log(attackingPlayer.name + ' conquered ' + defendingTerritory.name + '!');

                    moveArmies(attackingTerritory, defendingTerritory, result.numberOfAttackDice);
                    prePlacedArmies = result.numberOfAttackDice;

                    if (checkIfPlayerIsDefeated(defendingPlayer)) {
                        console.log(defendingPlayer.name + ' is defeated');
                        removePlayer(defendingPlayer.name);
                        //debugger;
                        if (checkIfGameOver()) {
                            GameStates.gameState = GameStates.GAME_OVER;
                        }
                    }
                    if (attackingTerritory.armies > 1) {
                        getNumberOfArmiesToMove(attackingTerritory);
                    }
                }
            } else {
                console.log('To attack a territory you need at least 2 armies!');
            }
        }
    }
    return result || {};
}

function battle() {
    var battleResult = {
        attackingArmiesToRemove: 0,
        defendingArmiesToRemove: 0,
        attackResult: [],
        defenseResult: [],
        numberOfAttackDice: 0
    };

    var numberOfAttackDice = getMaxAttackDice();
    var numberOfDefenseDice = getMaxDefenceDice();

    battleResult.numberOfAttackDice = numberOfAttackDice;

    var attackResult = rollDice(numberOfAttackDice);
    var defenseResult = rollDice(numberOfDefenseDice);

    var numberOfDice;

    if (numberOfAttackDice <= numberOfDefenseDice) {
        numberOfDice = numberOfAttackDice;
    } else {
        numberOfDice = numberOfDefenseDice;
    }

    for (var i = 0; i < numberOfDice; i++) {
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

function rollDice(numberOfDice) {
    var result = [];

    for (var i = 0; i < numberOfDice; i++) {
        result.push(rollDie());
    }

    return result.sort(function (a, b) { return b - a; });
}

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

function checkIfGameOver() {
    if (players.length === 1 && players[0] === currentPlayer) {
        return true;
    }
    return false;
}

function checkIfPlayerIsDefeated(player) {
    if (player.numberOfArmies === 0 && player.territoriesOwned.length === 0) {
        return true;
    }
    return false;
}

