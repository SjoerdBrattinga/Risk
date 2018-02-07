function placeArmiesAiEasy() {
    GameStates.currentPlayer.setArmiesToPlace();
    var count = GameStates.currentPlayer.armiesToPlace;
    for (var i = 0; i < count; i++){
        var territory = getRandomTerritory(GameStates.currentPlayer.territoriesOwned);
        territory.addArmies(1);
        GameStates.currentPlayer.addArmies(1);
        GameStates.currentPlayer.armiesToPlace--;
        setInstructionText();
    }
    attackTerritoryAiEasy();
    //endTurn();
}

function attackTerritoryAiEasy() {
    //var clusters = getClusters();
    for (var i = 0; i < GameStates.currentPlayer.territoriesOwned.length; i++) {
        var connectedTerritories = GameStates.currentPlayer.territoriesOwned[i].borderTerritories;
        for (var j = 0; j < connectedTerritories.length; j++){
            var owner = connectedTerritories[j].owner;
            if (owner !== GameStates.currentPlayer && connectedTerritories[j].armies < GameStates.currentPlayer.territoriesOwned[i].armies){

                GameStates.attackingTerritory = GameStates.currentPlayer.territoriesOwned[i];
                GameStates.defendingTerritory = connectedTerritories[j];
                attackTerritory();
            }
        }
    }
    fortifyTerritoryAiEasy();
}

function fortifyTerritoryAiEasy () {
    for (var i = 0; i < GameStates.currentPlayer.territoriesOwned.length; i++){
        var territory = getRandomTerritory(GameStates.currentPlayer.territoriesOwned);
        var borderingTerritories = checkBorderTerritories(territory, GameStates.currentPlayer.territoriesOwned[i]);
        if (borderingTerritories && territory.armies > 1){
            var getborderingTerritory = GameStates.currentPlayer.territoriesOwned[i];
            var botArmiesToMove = territory.armies - 1;
            moveArmies(territory,getborderingTerritory, botArmiesToMove);
        }

    }
}