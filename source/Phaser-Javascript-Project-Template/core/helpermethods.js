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
    //console.log(territory2.name + ' is not a border territory!');
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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function arrayContainsObject(array, object) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === object) {
            return true;
        }
    }
    return false;
}