function Continent (name, extraArmies, territoriesInContinent) {
    this.name = name;
    this.extraArmies = extraArmies;
    this.territoriesInContinent = territoriesInContinent;

    this.territoriesInContinent = [];
    this.borderTerritories = [];

    this.color = 0;

};

function isOwned() {
    //code...
};

function getOwner(player) {
    return player;
};

function getTerritoriesInContinent() {
    return this.territoriesInContinent;
};

function getBorderTerritories() {
    return this.borderTerritories;
};

function setColor(color) {
    return this.color;
}
