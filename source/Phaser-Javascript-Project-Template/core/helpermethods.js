function getRandomPlayer() {
    return players[Math.floor(Math.random() * players.length)];
}

function getRandomTerritory(territoryList) {
    return territoryList[Math.floor(Math.random() * territoryList.length)];
}

function checkBorderTerritories(territory1, territory2) {
    for (var i = 0; i < territory1.borderTerritories.length; i++) {
        if (territory1.borderTerritories[i] === territory2) {
            return true;
        }
    }
    return false;
}

function checkIfTerritoriesAreConnected(territory1, territory2) {
    var checkList = [];
    var doneList = [];
    checkList.push(territory1);

    while (checkList.length > 0) {
        var territory = checkList[0];
        var reachableTerritories = getOwnedBorderTerritories(territory);
        checkList.splice(0, 1);
        doneList.push(territory);

        for (var i = 0; i < reachableTerritories.length; i++) {
            if (reachableTerritories[i] === territory2) {
                return true;
            }
            if (!arrayContainsObject(doneList, reachableTerritories[i])) {
                checkList.push(reachableTerritories[i]);
            }
        }
    }
    return false;
}

function getOwnedBorderTerritories(territory) {
    var borderTerritories = territory.borderTerritories;
    var ownedBorderTerritories = [];
    for (var i = 0; i < borderTerritories.length; i++) {
        var owner = borderTerritories[i].owner;

        if (owner === currentPlayer) {
            ownedBorderTerritories.push(borderTerritories[i]);
        }
    }
    return ownedBorderTerritories;
}

function getNotOwnedBorderTerritories(territory) {
    var borderTerritories = territory.borderTerritories;
    var notOwnedBorderTerritories = [];
    for (var i = 0; i < borderTerritories.length; i++) {
        var owner = borderTerritories[i].owner;

        if (owner !== currentPlayer) {
            notOwnedBorderTerritories.push(borderTerritories[i]);
        }
    }
    return notOwnedBorderTerritories;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

//function shuffleCards() {
//    for (var i = 0; i < shuffleCnt; i++) {
//        var rndNo = getRandomInt(1, 52);
//        var card = cards[i];
//        cards[i] = cards[rndNo];
//        cards[rndNo] = card;
//    }
//}

function arrayContainsObject(array, object) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === object) {
            return true;
        }
    }
    return false;
}

function compareArrays(array1, array2) {
    array1.sort();
    array2.sort();

    if (_.isEqual(array1, array2)){
        return true;
    }
    return false;
}

function getColorFromCOLORS() {
    return GameStates.COLORS[players.length];
}

function checkIfPlayerNameExists(name) {
    for (var i = 0; i < players.length; i++) {
        if (name.toLowerCase() === players[i].name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

//var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
//angleDeg = Math.atan2(GameStates.defendingTerritory.positionY - GameStates.attackingTerritory.positionY,
//    GameStates.defendingTerritory.positionX - GameStates,attackingTerritory.positionX) * 180 / Math.PI;

//var xDifference = GameStates.defendingTerritory - GameStates.attackingTerritory;
//var yDifference = GameStates.defendingTerritory - GameStates.attackingTerritory;

function pythagorean(xDifference, yDifference){
    return Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2));
}