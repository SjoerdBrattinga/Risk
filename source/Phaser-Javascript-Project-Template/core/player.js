function Player(type, name, color) {
    this.type = type;
    this.name = name;
    this.color = color;

    this.numberOfArmies = 0;
    this.extraArmies = 0;
    this.armiesToPlace = 0;

    this.territoriesOwned = [];
    this.cardOwned = [];
}

Player.prototype = {

    getHexaColor: function() {
        for (var i = 0; i < GameStates.COLORS.length; i++) {
            if (GameStates.COLORS[i] === this.color) {
                return GameStates.HEXA_COLORS[i];
            }
        }
        return '';
    },

    setNumberOfExtraArmies: function(extraArmies) {
        this.extraArmies = extraArmies;
    },

    addArmies: function (armiesToAdd) {
        this.numberOfArmies += armiesToAdd;
    },

    removeArmies: function (armiesToRemove) {
        this.numberOfArmies -= armiesToRemove;
    },

    setArmiesToPlace: function() {
        this.armiesToPlace = Math.floor(this.territoriesOwned.length / 3) + this.extraArmies;
        if (this.armiesToPlace < 3) {
            this.armiesToPlace = 3;
        }
    },

    getDefenseValue: function () {
        return this.numberOfArmies / this.territoriesOwned.length;
    },

    tradeInCards: function (card1, card2, card3) {
     // TODO...
    }
};