function Player(type, name, color) {
    this.type = type;
    this.name = name;
    this.color = color;

    this.numberOfArmies = 0;
    this.extraArmies = 0;

    this.territoriesOwned = [];
    this.cardOwned = [];

    this.setColor = setColor;
    this.getColor = getColor;
    this.getHexaColor = getHexaColor;

    this.getNumberOfArmies = getNumberOfArmies;
    this.addArmies = addArmies;
    this.removeArmies = removeArmies;

    this.getNumberOfExtraArmies = getNumberOfExtraArmies;
    this.setNumberOfExtraArmies = setNumberOfExtraArmies;

    this.getTerritoriesOwned = getTerritoriesOwned;
    //this.setTerritoriesOwned = setTerritoriesOwned;

    this.tradeInCards = tradeInCards;
}

function setColor(color) {
    this.color = color;
}

function getColor() {
    return this.color;
}

function getHexaColor() {
    //var color;
    for (var i = 0; i < GameStates.COLORS.length; i++) {
        //console.log(GameStates.HEXA_COLORS[i]);
        if (GameStates.COLORS[i] === this.getColor()) {
            //console.log(this.getColor());
            return GameStates.HEXA_COLORS[i];
        } 
    }
    return null;
}

function getNumberOfArmies() {
    return this.numberOfArmies;
}

function setNumberOfArmies(numberOfArmies) {
    this.numberOfArmies = numberOfArmies;
}

function getNumberOfExtraArmies() {
    return this.extraArmies;
}

function setNumberOfExtraArmies(extraArmies) {
    this.extraArmies = extraArmies;
}

function addArmies(armiesToAdd) {
    this.numberOfArmies += armiesToAdd;
}

function removeArmies(armiesToRemove) {
    this.numberOfArmies -= armiesToRemove;
}

function getTerritoriesOwned() {
    //debugger;
    //for (var i = 0; i < territories.length; i++) {
    //    if (territories[i].getOwner === this.Player) {
    //        this.territoriesOwned.push(territories[i]);
    //    }
    //}
    return this.territoriesOwned;
}

//function setTerritoriesOwned(territoriesOwned) {
//    this.territoriesOwned = territoriesOwned;
//}

function tradeInCards(card1, card2, card3) {
    //
}