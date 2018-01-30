function placeArmiesAiHard() {
    //TODO: difficult bot places armies strategically.
    //Pretty much should play like an actual human player.
    currentPlayer.setArmiesToPlace();
    var count = currentPlayer.armiesToPlace;
    for (var i = 0; i < count; i++) {
        var territory = getRandomTerritory(currentPlayer.territoriesOwned);
        territory.addArmies(1);
        currentPlayer.addArmies(1);
        currentPlayer.armiesToPlace--;
        setInstructionText();
    }
    //placeArmiesAiAverage();
    if (shouldAttack())
        attackTerritoryAiHard();
    else
        fortifyTerritoryAiHard();
}

function shouldAttack() {
    var defenseValue = currentPlayer.getDefenseValue();
    var otherPlayersDefenseValues = [];
    var otherPlayersArmies = [];
    for (var j = 0; j < players.length; j++) {
        if (players[j].name !== currentPlayer.name) {
            otherPlayersDefenseValues.push(players[j].getDefenseValue());
            otherPlayersArmies.push(players[j].numberOfArmies);
        }
    }
    var largestDefenseValue = Math.max.apply(Math, otherPlayersDefenseValues);
    var largestArmy = Math.max.apply(Math, otherPlayersArmies);

    if (defenseValue > largestDefenseValue * 0.7) return true;
    else if (largestArmy < currentPlayer.numberOfArmies) return true;
    else return false;

}

function attackTerritoryAiHard() {
    //TODO: difficult bot attacks territory strategically.
    //Pretty much should play like an actual human player.
    for (var i = 0; i < currentPlayer.territoriesOwned.length; i++) {
        var connectedTerritories = currentPlayer.territoriesOwned[i].borderTerritories;
        for (var j = 0; j < connectedTerritories.length; j++) {
            var owner = connectedTerritories[j].owner;
            if (owner !== currentPlayer && connectedTerritories[j].armies < currentPlayer.territoriesOwned[i].armies) {

                GameStates.attackingTerritory = currentPlayer.territoriesOwned[i];
                GameStates.defendingTerritory = connectedTerritories[j];

                //debugger;
                var defenseValue = currentPlayer.getDefenseValue();
              

                while (GameStates.attackingTerritory.armies > GameStates.defendingTerritory.armies * 1.5){

                    attackTerritory();
                    var newDefenseValue = currentPlayer.getDefenseValue();
                    if (newDefenseValue < defenseValue * 0.9)
                        break;
                }
                    
            }
        }
    }
    fortifyTerritoryAiHard();
}

function fortifyTerritoryAiHard() {
    //TODO: difficult bot fortifies territory strategically.
    //Pretty much should play like an actual human player.
    var safeTerritories = getSafeTerritories();
    if (safeTerritories.length > 0) {
        var safeTerritoryWithMostArmies = safeTerritories.reduce(function (l, e) {
            return e.armies > l.armies ? e : l;
        });
        if (safeTerritoryWithMostArmies.armies > 1) {
            var notOwnedTerritories = [];

            for (var i = 0; i < territories.length; i++) {
                if (territories[i].owner !== currentPlayer) {
                    notOwnedTerritories.push(territories[i]);
                }
            }
            var ownedBorderTerritories;
            for (var j = 0; j < notOwnedTerritories.length; j++) {
                ownedBorderTerritories = getOwnedBorderTerritories(notOwnedTerritories[j]);
                for (var k = 0; k < ownedBorderTerritories.length; k++) {
                    if (checkIfTerritoriesAreConnected(safeTerritoryWithMostArmies, ownedBorderTerritories[j])) {
                        var botArmiesToMove = safeTerritoryWithMostArmies.armies - 1;
                        moveArmies(safeTerritoryWithMostArmies, ownedBorderTerritories[j], botArmiesToMove);
                        break;
                    }
                }
            }
        }

    }
}