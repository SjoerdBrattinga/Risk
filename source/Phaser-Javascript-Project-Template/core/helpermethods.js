function getRandomPlayer() {
    return GameStates.players[Math.floor(Math.random() * GameStates.players.length)];
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

        if (owner === GameStates.currentPlayer) {
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

        if (owner !== GameStates.currentPlayer) {
            notOwnedBorderTerritories.push(borderTerritories[i]);
        }
    }
    return notOwnedBorderTerritories;
}

function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
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

    if (_.isEqual(array1, array2)) {
        return true;
    }
    return false;
}

function getColorFromCOLORS() {
    return GameStates.COLORS[GameStates.players.length];
}

function checkIfPlayerNameExists(name) {
    for (var i = 0; i < GameStates.players.length; i++) {
        if (name.toLowerCase() === GameStates.players[i].name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function getAngle(point1, point2) {
    var offSet = 270;
    var angleDegree = (Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI);
    angleDegree += offSet;

    return angleDegree;
}

function getDistance(point1, point2) {
    var differenceX = point2.x - point1.x;
    var differenceY = point2.y - point1.y;

    return Math.sqrt(Math.pow(differenceX, 2) + Math.pow(differenceY, 2));
}

function getMidPoint(point1, point2) {
    var midPoint = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2
    };

    return midPoint;
}