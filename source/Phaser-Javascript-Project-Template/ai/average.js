function placeArmiesAiAverage () {
    //TODO: average bot places armies on territory.
    //Could decide if it's worth placing armies if bordering territories are his own.

    currentPlayer.setArmiesToPlace();
    var count = currentPlayer.armiesToPlace;
}

function attackTerritoryAiAverage () {
    //TODO: average bot attacks territory based.
    //Could decide if it's worth attacking if it has more armies and has more territories closeby

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
        count = 0;
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