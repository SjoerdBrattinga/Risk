function placeArmiesAiEasy() {
    //TODO: easy bot places armies on territory (RANDOM)
    var count = currentPlayer.armiesToPlace;
    for (var i = 0; i < count; i++){
        var territory = getRandomTerritory(currentPlayer.territoriesOwned);
        territory.addArmies(1);
        currentPlayer.addArmies(1);
        currentPlayer.armiesToPlace--;
        setInstructionText();
    }
    attackTerritoryAiEasy();
    endTurn();
}

function attackTerritoryAiEasy() {
    //TODO: easy bot attacks nearest territory (which has less armies than his own.)

    for(var i = 0; i < currentPlayer.territoriesOwned.length; i++) {
        var connectedTerritories = currentPlayer.territoriesOwned[i].borderTerritories;
        for (var j = 0; j < connectedTerritories.length; j++){
            var owner = connectedTerritories[j].owner;
            if(owner !== currentPlayer && connectedTerritories[j].armies < currentPlayer.territoriesOwned[i].armies){

                GameStates.attackingTerritory = currentPlayer.territoriesOwned[i];
                GameStates.defendingTerritory = connectedTerritories[j];
                attackTerritory();
                debugger;
                fortifyTerritoryAiEasy();
            }
        }
    }
}

function fortifyTerritoryAiEasy () {
    // TODO: fortifies territory (for now this can be random, maybe it should be more advanced for the average and / or hard bots)

    for(var i = 0; i < currentPlayer.territoriesOwned.length; i++){
        var getTerritory = getRandomTerritory(currentPlayer.territoriesOwned);
        var borderingTerritories = checkBorderTerritories(getTerritory, currentPlayer.territoriesOwned[i]);
        if (borderingTerritories && getTerritory.armies > 1){
            var getborderingTerritory = currentPlayer.territoriesOwned[i];
            var botArmiesToMove = getTerritory.armies - 1;
            moveArmies(getTerritory,getborderingTerritory, botArmiesToMove);
        }

    }
}