function Territory(game, name, positionX, positionY) {
    this.game = game;
    this.sprite = null;
    this.name = name;
    this.positionX = positionX;
    this.positionY = positionY;
    this.owner = {};
    this.armies = 0;
    this.color = 0;
    this.borderTerritories = [];
    this.armiesText = null;
}

Territory.prototype = {
    create: function () {
        this.sprite = this.game.add.sprite(this.positionX, this.positionY, 'red_circle');
        this.sprite.scale.setTo(0.7, 0.7);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.listener, this);

        circleTextGroup.add(this.sprite);

        this.armiesText = this.game.add.text(this.positionX, this.positionY, this.armies, {
            font: '20px Arial',
            fill: '#fff',
            align: 'center'
        }, circleTextGroup);
        this.armiesText.anchor.setTo(0.5, 0.4);
    },

    listener: function () {
        if (GameStates.gameState === GameStates.PLACE_ARMIES) {
            if (this.owner === currentPlayer && currentPlayer.armiesToPlace > 0) {
                this.addArmies(1);
                currentPlayer.addArmies(1);
                currentPlayer.armiesToPlace--;
                //setInstructionTex();
                if (currentPlayer.armiesToPlace === 0) {
                    continueBtn.visible = true;
                }
            }
        } else if (GameStates.gameState === GameStates.ATTACK) {
            if (this.owner === currentPlayer) {
                GameStates.attackingTerritory = this;
                //setInstructionText();
                console.log('Attacking territory', GameStates.attackingTerritory);
            } else {
                if (checkBorderTerritories(GameStates.attackingTerritory, this)) {
                    GameStates.defendingTerritory = this;
                    console.log('Defending territory');
                } else {
                    GameStates.defendingTerritory = null;
                }
                //setInstructionText();
            }
            if (GameStates.attackingTerritory && GameStates.defendingTerritory) {
                attackBtn.visible = true;
            }
        } else if (GameStates.gameState === GameStates.FORTIFYING) {
            if (this.owner === currentPlayer) {
                if (this.armies > 1 && GameStates.attackingTerritory === null) {
                    GameStates.attackingTerritory = this;
                } else if (checkIfTerritoriesAreConnected(GameStates.attackingTerritory, this) && GameStates.attackingTerritory) {
                    GameStates.defendingTerritory = this;
                    getNumberOfArmiesToMove(GameStates.attackingTerritory);
                }

            }
            //setInstructionText();
        }
        setInstructionText();
        //GameStates.selectedTerritory = this;
        //console.log('selected territory', GameStates.selectedTerritory);
        //return this;
    },

    setOwner: function (player) {
        if(this.owner && this.owner.territoriesOwned) {
            for (var i = 0; i < this.owner.territoriesOwned.length; i++) {
                if (this.owner.territoriesOwned[i] === this) {
                    this.owner.territoriesOwned.splice(i, 1);
                    break;
                }
            }
        }
        this.owner = player;
        player.territoriesOwned.push(this);
        this.changeTexture(player.getColor());
    },

    changeTexture: function (color) { //COLORS: ['blue', 'red', 'green', 'brown', 'purple', 'darkorange'],
        if (color === 'blue')
            this.sprite.loadTexture('blue_circle');
        else if (color === 'red')
            this.sprite.loadTexture('red_circle');
        else if (color === 'green')
            this.sprite.loadTexture('green_circle');
        else if (color === 'brown')
            this.sprite.loadTexture('brown_circle');
        else if (color === 'purple')
            this.sprite.loadTexture('purple_circle');
        else if (color === 'darkorange')
            this.sprite.loadTexture('orange_circle');
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
        //this.armiesText.anchor.setTo(0.5,0.4);
    },

    getBorderTerritories: function () {
        return this.borderTerritories;
    },

    setBorderTerritories: function (borderTerritories) {
        this.borderTerritories = borderTerritories;
    }

    //drawCircle: function () {
    //    //var circle = this.game.add.graphics(0, 0);
    //    //circle.beginFill(this.owner.getHexaColor(), 1);
    //    //circle.drawCircle(this.positionX, this.positionY, 25);
    //    this.circleX = this.game.add.graphics(0, 0);
    //    this.circleX.beginFill(this.owner.getHexaColor(), 1);
    //    this.circleX.drawCircle(this.positionX, this.positionY, 25);
    //    this.setArmiesText();
    //},

    //changeCircleColor: function () {
    //    var circle = this.game.add.graphics(0, 0);
    //    circle.beginFill(GameStates.HEXA_COLORS[Math.floor(Math.random() * GameStates.HEXA_COLORS.length)], 1);
    //    circle.drawCircle(this.positionX, this.positionY, 25);
    //    this.setArmiesText();
    //}
};









