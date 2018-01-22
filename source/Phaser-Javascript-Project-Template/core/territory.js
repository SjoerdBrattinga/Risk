function Territory(name, positionX, positionY) {
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.owner = {};
    this.armies = 0;
    this.color = 0;
    this.borderTerritories = [];

    this.setOwner = function(player) {
        this.owner = player;
        player.territoriesOwned.push(this);
        this.drawCircle();
    }

    this.getOwner = function getOwner() {
        return this.owner;
    }

    this.getNumberOfArmies = function getNumberOfArmies() {
        return this.armies;
    }

    this.addArmies = function addArmies(armiesToAdd) {
        this.armies += armiesToAdd;
    }

    this.removeArmies = function removeArmies(armiesToRemove) {
        this.armies -= armiesToRemove;
    }

    this.getBorderTerritories = function getBorderTerritories() {
        return this.borderTerritories;
    }

    this.setBorderTerritories = function setBorderTerritories(borderTerritories) {
        this.borderTerritories = borderTerritories;
    }

    this.drawCircle = function() {
        circleGraphics.beginFill(this.owner.getHexaColor(), 1);
        circleGraphics.drawCircle(this.positionX, this.positionY, 25);
    }

    this.changeCircleColor = function changeCircleColor() {
        circleGraphics.beginFill(GameStates.HEXA_COLORS[Math.floor(Math.random() * GameStates.HEXA_COLORS.length)], 1);
        circleGraphics.drawCircle(this.positionX, this.positionY, 25);
    }
}









