function placeArmiesAiAverage () {
    //TODO: average bot places armies on territory.
    //Could decide if it's worth placing armies if bordering territories are his own.

    currentPlayer.setArmiesToPlace();
    var count = currentPlayer.armiesToPlace;
    for (var i = 0; i < currentPlayer.territoriesOwned.length; i++){
        var borderTerritories = currentPlayer.territoriesOwned[i].borderTerritories;
        var saveTerritory = [];
        var borderTerritoriesOwned = getOwnedBorderTerritories(currentPlayer.territoriesOwned[i]);
        if (borderTerritoriesOwned === borderTerritories){

            saveTerritory.push(currentPlayer.territoriesOwned[i]);
        }
    }

}

function attackTerritoryAiAverage () {
    //TODO: average bot attacks territory based.
    //Could decide if it's worth attacking if it has more armies and has more territories closeby

}

function fortifyTerritoryAiAverage () {
    //TODO: average bot fortifies territory.
    //Could decide if territory should be fortified depending on bordering territories.

}

function compareArrays () {
    
}