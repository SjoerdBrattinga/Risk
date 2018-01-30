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
    attackTerritoryAiHard();
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
                while (GameStates.attackingTerritory.armies > GameStates.defendingTerritory.armies * 1.5)//
                    attackTerritory();
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