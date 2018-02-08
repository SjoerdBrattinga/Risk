function newGame() {
    if (GameStates.players.length < 2) return;

    if (GameStates.gameState === GameStates.NEW_GAME) {
        //cards = shuffleCards();
        var startingArmies = 30;

        for (var i = 0; i < GameStates.players.length; i++) {
            GameStates.players[i].numberOfArmies = startingArmies;
        }

        assignArmiesToTerritories(startingArmies);
        //currentPlayer = getRandomPlayer();
        GameStates.currentPlayer = GameStates.players[0];
        GameStates.conqueredTerritory = false;
        newTurn();
    }
}

function newTurn() {
    setCurrentPlayerText();
    GameStates.currentPlayer.setArmiesToPlace();
    GameStates.fortified = false;

    if (GameStates.currentPlayer.type !== 0) {
        GameStates.continueBtn.visible = true;
        if (GameStates.currentPlayer.type === 1) {
            placeArmiesAiEasy();
        }
        if (GameStates.currentPlayer.type === 2) {
            placeArmiesAiAverage();
        }
        if (GameStates.currentPlayer.type === 3) {
            placeArmiesAiHard();
        }
        GameStates.gameState = GameStates.END_TURN;

    } else {
        GameStates.continueBtn.visible = false;
        GameStates.gameState = GameStates.PLACE_ARMIES;
    }

    setInstructionText();
}

function assignTerritories() {
    shuffle(GameStates.territories);

    var count = 0;
    for (var i = 0; i < GameStates.territories.length; i++) {
        GameStates.territories[i].setOwner(GameStates.players[count]);
        count++;
        if (count === GameStates.players.length) count = 0;
    }
}

function setCurrentPlayerText() {
    GameStates.currentPlayerText.setText(GameStates.currentPlayer.name + '\'s turn');
    GameStates.currentPlayerText.addColor(GameStates.currentPlayer.getHexaColor(), 0);
}

function setInstructionText() {
    if (GameStates.gameState === GameStates.PLACE_ARMIES) {
        GameStates.instructionText.setText('Place armies: ' + GameStates.currentPlayer.armiesToPlace);
    } else if (GameStates.gameState === GameStates.ATTACK) {
        if (GameStates.attackingTerritory && GameStates.defendingTerritory === null)
            GameStates.instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ...');
        else if (GameStates.attackingTerritory && GameStates.defendingTerritory)
            GameStates.instructionText.setText('Attack: ' + GameStates.attackingTerritory.name + ' vs ' + GameStates.defendingTerritory.name);
        else if (GameStates.attackingTerritory === null && GameStates.defendingTerritory)
            GameStates.instructionText.setText('Attack: ... vs ' + GameStates.defendingTerritory.name);
        else
            GameStates.instructionText.setText('Attack');
    } else if (GameStates.gameState === GameStates.FORTIFYING) {
        console.log('fortifying');
        if (GameStates.attackingTerritory && GameStates.defendingTerritory === null) {
            GameStates.instructionText.setText('Moving from: ' + GameStates.attackingTerritory.name);
        } else if (GameStates.attackingTerritory && GameStates.defendingTerritory) {
            GameStates.instructionText.setText('Moving from: ' + GameStates.attackingTerritory.name + ' to ' + GameStates.defendingTerritory.name);
        } else if (GameStates.attackingTerritory === null && GameStates.defendingTerritory) {
            GameStates.instructionText.setText('Moving from: ... to ' + GameStates.defendingTerritory.name);
        } else {
            GameStates.instructionText.setText('Fortify');
        }
    } else if (GameStates.gameState === GameStates.END_TURN) {
        GameStates.instructionText.setText('End turn');
    }
}

function assignArmiesToTerritories(startingArmies) {
    for (var i = 0; i < GameStates.players.length; i++) {
        var playerTerritories = GameStates.players[i].territoriesOwned;
        var armies = startingArmies;

        for (var j = 0; j < playerTerritories.length; j++) {
            var maxArmiesToAssign = armies / (playerTerritories.length - j);
            maxArmiesToAssign = Math.round(maxArmiesToAssign);

            var armiesToAssign = Math.round(Math.random() * maxArmiesToAssign) + 1;
            if (armiesToAssign > maxArmiesToAssign){
                armiesToAssign = maxArmiesToAssign;
            }

            playerTerritories[j].addArmies(armiesToAssign);
            armies -= armiesToAssign;
        }
    }
}

function getMaxArmiesToAssign(attackingTerritory) {
    GameStates.maxArmiesToAssign = attackingTerritory.armies - 1;
}

function moveArmies(territory1, territory2, armiesToMove) {
    if (territory1.armies - armiesToMove >= 1) {
        territory1.removeArmies(armiesToMove);
        territory2.addArmies(armiesToMove);
    } else {
        console.log('Can not move ' + territory1.armies + ' armies');
    }
}

function endTurn() {
    setCurrentPlayer();
    newTurn();
}

function setCurrentPlayer() {
    var currentIndex = GameStates.players.indexOf(GameStates.currentPlayer);

    if (currentIndex !== GameStates.players.length - 1)
        GameStates.currentPlayer = GameStates.players[currentIndex + 1];
    else
        GameStates.currentPlayer = GameStates.players[0];
}


function addPlayer(type, name, color) {
    var player = new Player(type, name, color);
    GameStates.players.push(player);

    return player;
}

function removePlayer(name) {
    if (GameStates.players.length > 0) {
        for (var i = 0; i < GameStates.players.length; i++) {
            if (GameStates.players[i].name === name) {
                GameStates.players.splice(i, 1);
                break;
            }
        }
    } else {
        console.warn('No player to remove!');
    }
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
                var attackingPlayer = attackingTerritory.owner;
                var defendingPlayer = defendingTerritory.owner;

                checkBorderTerritories(attackingTerritory, defendingTerritory);

                result = battle();
                result.conqueredTerritory = false;
                GameStates.defendingTerritory.removeArmies(result.defendingArmiesToRemove);
                defendingPlayer.removeArmies(result.defendingArmiesToRemove);

                GameStates.attackingTerritory.removeArmies(result.attackingArmiesToRemove);
                attackingPlayer.removeArmies(result.attackingArmiesToRemove);

                if (GameStates.currentPlayer.type === 0 && attackingTerritory.armies === 1) {
                    GameStates.arrow.kill();
                    GameStates.attackBtn.visible = false;
                    GameStates.attackingTerritory = null;
                    GameStates.defendingTerritory = null;
                    setInstructionText();
                } else if (defendingTerritory.armies === 0) {
                    setInstructionText();
                    result.conqueredTerritory = true;
                    GameStates.attackBtn.visible = false;

                    defendingTerritory.setOwner(attackingPlayer);
                    console.log(attackingPlayer.name + ' conquered ' + defendingTerritory.name + '!');

                    moveArmies(attackingTerritory, defendingTerritory, result.numberOfAttackDice);
                    GameStates.prePlacedArmies = result.numberOfAttackDice;

                    if (checkIfPlayerIsDefeated(defendingPlayer)) {
                        console.log(defendingPlayer.name + ' is defeated');
                        removePlayer(defendingPlayer.name);
                  
                        if (checkIfGameOver()) {
                            GameStates.gameState = GameStates.GAME_OVER;
                        }
                    }
                    if (attackingTerritory.armies > 1) {
                        getMaxArmiesToAssign(attackingTerritory);
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
        numberOfAttackDice: 0,
        numberOfDefenseDice: 0
    };

    battleResult.numberOfAttackDice = getMaxAttackDice();
    battleResult.numberOfDefenseDice = getMaxDefenseDice();

    battleResult.attackResult = rollDice(battleResult.numberOfAttackDice);
    battleResult.defenseResult = rollDice(battleResult.numberOfDefenseDice);

    var numberOfDice;

    if (battleResult.numberOfAttackDice <= battleResult.numberOfDefenseDice) {
        numberOfDice = battleResult.numberOfAttackDice;
    } else {
        numberOfDice = battleResult.numberOfDefenseDice;
    }

    for (var i = 0; i < numberOfDice; i++) {
        if (battleResult.attackResult[i] > battleResult.defenseResult[i]) {
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

function getMaxDefenseDice() {
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
    if (GameStates.players.length === 1 && GameStates.players[0] === GameStates.currentPlayer) {
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

