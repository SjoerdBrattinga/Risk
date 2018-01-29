﻿function Player(type, name, color) {
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

    setColor: function(color) {
      this.color = color;
    },

    getColor: function() {
        return this.color;
    },

    getHexaColor: function() {
        //var color;
        for (var i = 0; i < GameStates.COLORS.length; i++) {
            //console.log(GameStates.HEXA_COLORS[i]);
            if (GameStates.COLORS[i] === this.getColor()) {
                //console.log(this.getColor());
                return GameStates.HEXA_COLORS[i];
            }
        }
        return null;
    },

    getNumberOfArmies: function() {
        return this.numberOfArmies;
    },

    setNumberOfArmies: function(numberOfArmies) {
        this.numberOfArmies = numberOfArmies;
    },

    getNumberOfExtraArmies: function() {
        return this.extraArmies;
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

    getTerritoriesOwned: function () {
        return this.territoriesOwned;
    },

    getDefenseValue: function () {
        return this.territoriesOwned.length / this.numberOfArmies;
    },

    tradeInCards: function (card1, card2, card3) {
     // TODO...
    }
};