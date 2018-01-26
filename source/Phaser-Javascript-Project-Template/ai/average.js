function placeArmiesAiAverage () {
    //TODO: average bot places armies on territory.
    //TODO: THIS NEEDS TO ALSO WORK WHEN THERES NO SAFETERRITORY!
    //Could decide if it's worth placing armies if bordering territories are his own.
    currentPlayer.setArmiesToPlace();
    var count1 = currentPlayer.armiesToPlace;
    var safeTerritories = getSafeTerritories();
    for (var j = 0; j < currentPlayer.territoriesOwned.length; j++){
        for (var i = 0; i < safeTerritories.length; i++) {
            var territory = getRandomTerritory(safeTerritories);
            var getOwnTerritory = getOwnedBorderTerritories(territory);
            for(var k = 0; k < getOwnTerritory.length; k++) {
                var connectedTerritories = checkBorderTerritories(getOwnTerritory[k], currentPlayer.territoriesOwned[j]);
                if (!connectedTerritories) {
                    i = safeTerritories.length - 1;
                    j = currentPlayer.territoriesOwned - 1;
                    console.log("Added " + count1 + " armies to " + getOwnTerritory[k].name);
                    getOwnTerritory[k].addArmies(count1);
                    currentPlayer.addArmies(count1);
                    currentPlayer.armiesToPlace -= count1;
                    setInstructionText();
                    break;
                }
            }
        }
    }

            // for(var j = 0; j < count; j++) {
            //     territory.addArmies(count1);
            //     currentPlayer.addArmies(count1);
            //     currentPlayer.armiesToPlace -= count1;
            //     //j = count1;
            //     setInstructionText();
            // }

    // var territory = getRandomTerritory(safeTerritories);
    // console.log(territory);
    // console.log(territory.armies);
    // territory.addArmies(count1);
    // currentPlayer.addArmies(count1);
    // console.log(territory);
    // console.log(territory.armies);
    // currentPlayer.armiesToPlace -= count1;
    // setInstructionText();

}

function attackTerritoryAiAverage () {
    //TODO: average bot attacks territory based.
    //Could decide if it's worth attacking if it has more armies and has more territories nearby


}

function fortifyTerritoryAiAverage () {
    //TODO: average bot fortifies territory.
    //Could decide if territory should be fortified depending on bordering territories.

}

function getClusters() {

    var safeTerritories = getSafeTerritories();

    var cluster = [];
    var clusters = [];

    if(safeTerritories.length === 1){
        cluster.push(safeTerritories[0]);
        clusters.push(cluster);
        return clusters;
    }
    if(safeTerritories.length > 1){
        var count = 0;
        while(count < safeTerritories.length){
            cluster = [];
            for(var i = 0; i < safeTerritories.length; i++){
                if(checkBorderTerritories(safeTerritories[count],safeTerritories[i + 1]) && count !== i + 1 ){
                    if(!arrayContainsObject(cluster, safeTerritories[count])){
                        cluster.push(safeTerritories[count]);
                    }
                    if(!arrayContainsObject(cluster, safeTerritories[i + 1])){
                        cluster.push(safeTerritories[i + 1]);
                    }


                }
            }

            if(cluster.length > 0){
                clusters.push(cluster);
            }

            count++;
        }
        if(clusters.length === 0){

            for(var i = 0; i < safeTerritories.length; i++){
                cluster = [];
                cluster.push(safeTerritories[i]);
                clusters.push(cluster);

            }
        }
    }
    return clusters;



}

function getSafeTerritories(){
    var safeTerritories = [];
    for (var i = 0; i < currentPlayer.territoriesOwned.length; i++){
        var borderTerritories = currentPlayer.territoriesOwned[i].borderTerritories;
        var borderTerritoriesOwned = getOwnedBorderTerritories(currentPlayer.territoriesOwned[i]);
        if (compareArrays(borderTerritories, borderTerritoriesOwned)){

            safeTerritories.push(currentPlayer.territoriesOwned[i]);
        }
    }
    return safeTerritories;
}