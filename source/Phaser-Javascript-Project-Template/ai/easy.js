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
    endTurn();
}

function attackTerritoryAiEasy() {
    //TODO: easy bot attacks nearest territory which has less armies than his own.



}