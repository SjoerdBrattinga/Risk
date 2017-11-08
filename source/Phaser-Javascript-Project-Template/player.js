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

    this.getNumberOfArmies = getNumberOfArmies;
    this.addArmies = addArmies;
    this.removeArmies = removeArmies;
    this.getNumberOfExtraArmies = getNumberOfExtraArmies;

    this.getTerritoriesOwned = getTerritoriesOwned;
}

function setColor(color) {
    this.color = color;
}

function getColor() {
    return this.color;
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

function addArmies(armiesToAdd) {
    this.numberOfArmies += armiesToAdd;
}

function removeArmies(armiesToRemove) {
    this.numberOfArmies -= armiesToRemove;
}

function getTerritoriesOwned() {
    return this.territoriesOwned;
}