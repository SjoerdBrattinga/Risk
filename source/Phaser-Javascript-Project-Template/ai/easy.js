function placeArmiesAiEasy() {
    currentPlayer.setArmiesToPlace();
    var count = currentPlayer.armiesToPlace;
    for (var i = 0; i < count; i++){
        var territory = getRandomTerritory(currentPlayer.territoriesOwned);
        territory.addArmies(1);
        currentPlayer.addArmies(1);
        currentPlayer.armiesToPlace--;
        setInstructionText();
    }
    attackTerritoryAiEasy();
    //endTurn();
}

function attackTerritoryAiEasy() {
    //var clusters = getClusters();
    for(var i = 0; i < currentPlayer.territoriesOwned.length; i++) {
        var connectedTerritories = currentPlayer.territoriesOwned[i].borderTerritories;
        for (var j = 0; j < connectedTerritories.length; j++){
            var owner = connectedTerritories[j].owner;
            if(owner !== currentPlayer && connectedTerritories[j].armies < currentPlayer.territoriesOwned[i].armies){

                GameStates.attackingTerritory = currentPlayer.territoriesOwned[i];
                GameStates.defendingTerritory = connectedTerritories[j];
                attackTerritory();
            }
        }
    }
    fortifyTerritoryAiEasy();
}

function fortifyTerritoryAiEasy () {
    for(var i = 0; i < currentPlayer.territoriesOwned.length; i++){
        var territory = getRandomTerritory(currentPlayer.territoriesOwned);
        var borderingTerritories = checkBorderTerritories(territory, currentPlayer.territoriesOwned[i]);
        if (borderingTerritories && territory.armies > 1){
            var getborderingTerritory = currentPlayer.territoriesOwned[i];
            var botArmiesToMove = territory.armies - 1;
            moveArmies(territory,getborderingTerritory, botArmiesToMove);
        }

    }
}