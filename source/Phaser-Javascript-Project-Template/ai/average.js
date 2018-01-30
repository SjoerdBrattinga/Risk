function placeArmiesAiAverage () {
    //TODO: average bot places armies on territory.
    //TODO: THIS NEEDS TO ALSO WORK WHEN THERES NO SAFETERRITORY!
    //Could decide if it's worth placing armies if bordering territories are his own.
    //var count1 = currentPlayer.armiesToPlace;
    var safeTerritories = getSafeTerritories();
    var territory;
    if (safeTerritories.length === 0){
        for (var l = 0; l < currentPlayer.armiesToPlace; l++){
            territory = getRandomTerritory(currentPlayer.territoriesOwned);
            territory.addArmies(1);
            currentPlayer.addArmies(1);
            currentPlayer.armiesToPlace--;
            setInstructionText();
        }
    }
    for (var j = 0; j < currentPlayer.armiesToPlace.length; j++){
        //for (var i = 0; i < safeTerritories.length; i++) {
            territory = getRandomTerritory(safeTerritories);
            var getOwnTerritory = getOwnedBorderTerritories(territory);
            for(var k = 0; k < getOwnTerritory.length; k++) {
                var connectedTerritories = checkBorderTerritories(getOwnTerritory[k], currentPlayer.territoriesOwned[j]);
                if (connectedTerritories) {
                    console.log(connectedTerritories);
                   // i = safeTerritories.length - 1;
                    //j = currentPlayer.territoriesOwned - 1;
                    //console.log('Added ' + count1 + ' armies to ' + getOwnTerritory[k].name);
                    getOwnTerritory[k].addArmies(1);
                    currentPlayer.addArmies(1);
                    currentPlayer.armiesToPlace --;
                    setInstructionText();
                   // break;
                }
            }
        //}
    }
    attackTerritoryAiAverage();
    //endTurn();
}

function attackTerritoryAiAverage () {
    //TODO: average bot attacks territory based.
    //TODO: Make a retreat function which checks how the battle is going, if it's going bad stop attacking territoriy.
    //TODO: function getTerritoryToAttack (check what's a good territory to attack), compare defenseValues,
    //Could decide if it's worth attacking if it has more armies and has more territories nearby
    var defenseValue = currentPlayer.getDefenseValue();
    var territoriesToAttack = getTerritoriesToAttack();
    for (var i = 0; i < territoriesToAttack.length; i++){
        var attackingTerritory = getAttackingTerritory(territoriesToAttack[i]);
        if (attackingTerritory.armies > territoriesToAttack[i].armies){
            attackTerritory();
            // var newDefenseValue = currentPlayer.getDefenseValue();
            // if (defenseValue - defenseValue * 0.2 <= newDefenseValue){
            //     fortifyTerritoryAiAverage();
            // }
        }
    }
    fortifyTerritoryAiAverage();

    //Check if defenseValue isn't 25% below current defenseValue -> if (defenseValue <= defenseValue * 0.25) STOP ATTACKING;

}

function fortifyTerritoryAiAverage () {
    //TODO: average bot fortifies territory.
    //Could decide if territory should be fortified depending on bordering territories.

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

function getTerritoriesToAttack() {
    var safeTerritories = getSafeTerritories();
    if (safeTerritories.length === 0){
        console.log('Average is attacking');
        // var count = currentPlayer.armiesToPlace;
        // for (var z = 0; z < count; z++){
        //     var territory = getRandomTerritory(currentPlayer.territoriesOwned);
        //     territory.addArmies(1);
        //     currentPlayer.addArmies(1);
        //     currentPlayer.armiesToPlace--;
        //     setInstructionText();
        // }
        for(var z = 0; z < currentPlayer.territoriesOwned.length; z++) {
            var connectedTerritories = currentPlayer.territoriesOwned[z].borderTerritories;
            for (var y = 0; y < connectedTerritories.length; y++){
                var owner = connectedTerritories[y].owner;
                if(owner !== currentPlayer && connectedTerritories[y].armies < currentPlayer.territoriesOwned[z].armies){

                    GameStates.attackingTerritory = currentPlayer.territoriesOwned[z];
                    GameStates.defendingTerritory = connectedTerritories[y];
                    attackTerritory();
                }
            }
        }
    }
    var territoryToAttack = [];
    for (var i = 0; i < currentPlayer.territoriesOwned.length; i++) {
        for (var k = 0; k < safeTerritories.length; k++){
            var getOwnTerritories = getOwnedBorderTerritories(safeTerritories[k]);
            for (var l = 0; l < getOwnTerritories.length; l++){
                var notOwnedBorderTerritory = getNotOwnedBorderTerritories(getOwnTerritories[l]);
                if (notOwnedBorderTerritory){
                    for (var j = 0; j < notOwnedBorderTerritory.length; j++){
                        territoryToAttack.push(notOwnedBorderTerritory[j]);
                        l = getOwnTerritories.length - 1;
                        k = safeTerritories.length - 1;
                        i = currentPlayer.territoriesOwned.length - 1;
                    }
                }
            }
        }
    }
    return territoryToAttack;
}

function getAttackingTerritory (territory) {

    var attackTerritoriesArray = getOwnedBorderTerritories(territory);
    // var bestAttackingTerritory = attackTerritoriesArray.reduce(function(prev, current){
    //     return (prev.armies > current.armies) ? prev : current, null;
    // })
    var bestAttackingTerritory = 0;
    for (var i = 0; i < attackTerritoriesArray.length; i++){
        //Which territory has the most armies to attack with.
        if (bestAttackingTerritory < attackTerritoriesArray[i].armies){
            bestAttackingTerritory = attackTerritoriesArray[i];
        }
    }
    return bestAttackingTerritory;
}
