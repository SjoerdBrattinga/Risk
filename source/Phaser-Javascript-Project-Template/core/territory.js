function Territory(game, name, positionX, positionY) {
    this.game = game;
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.owner = {};
    this.armies = 0;
    this.color = 0;
    this.borderTerritories = [];
    this.armiesText = 0;
}

Territory.prototype = {
    setOwner: function (player) {
        this.owner = player;
        player.territoriesOwned.push(this);
        this.drawCircle();
    },

    getOwner: function () {
        return this.owner;
    },

    getNumberOfArmies: function () {
        return this.armies;
    },

    addArmies: function (armiesToAdd) {
        this.armies += armiesToAdd;
        this.armiesText.setText(this.armies);
    },

    removeArmies: function (armiesToRemove) {
        this.armies -= armiesToRemove;
        this.armiesText.setText(this.armies);
    },

    setArmiesText: function () {
        this.armiesText = this.game.add.text(this.positionX, this.positionY, this.armies, {
            font: '20px Arial',
            fill: '#fff',
            align: 'center'
        });
        this.armiesText.anchor.setTo(0.5,0.4);
    },

    getBorderTerritories: function () {
        return this.borderTerritories;
    },

    setBorderTerritories: function (borderTerritories) {
        this.borderTerritories = borderTerritories;
    },

    drawCircle: function () {
        var circle = this.game.add.graphics(0, 0);
        circle.beginFill(this.owner.getHexaColor(), 1);
        circle.drawCircle(this.positionX, this.positionY, 25);
        this.setArmiesText();
    },

    changeCircleColor: function () {
        var circle = this.game.add.graphics(0, 0);
        circle.beginFill(GameStates.HEXA_COLORS[Math.floor(Math.random() * GameStates.HEXA_COLORS.length)], 1);
        circle.drawCircle(this.positionX, this.positionY, 25);
        this.setArmiesText();
    }
};









