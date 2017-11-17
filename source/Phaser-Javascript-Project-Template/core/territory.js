function Territory(name, positionX, positionY) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.owner = {};
    this.armies = 0;
    this.color = 0;
    this.borderTerritories = [];
}

function setOwner(player) {
    this.owner = player;
}

function getOwner() {
    return this.owner;
}

function getNumberOfArmies() {
    return this.armies;
}

function addArmies(armiesToAdd) {
    this.armies += armiesToAdd;
}

function removeArmies(armiesToRemove) {
    this.armies -= armiesToRemove;
}

function getBorderTerritories() {
    return this.borderTerritories;
}

function setBorderTerritories(borderTerritories) {
    this.borderTerritories = borderTerritories;
}