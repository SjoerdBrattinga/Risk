﻿function Territory(game, name, positionX, positionY) {
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

    this.okBtn = null;
    this.addArmyBtn = null;
    this.removeArmyBtn = null;
}

Territory.prototype = {
    create: function () {
        this.sprite = this.game.add.sprite(this.positionX, this.positionY, 'red_circle');
        this.sprite.scale.setTo(0.7, 0.7);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.onClick, this);

        GameStates.circleTextGroup.add(this.sprite);

        this.armiesText = this.game.add.text(this.positionX, this.positionY, this.armies, {
            font: '20px Arial',
            fill: '#fff',
            align: 'center'
        }, GameStates.circleTextGroup);
        this.armiesText.anchor.setTo(0.5, 0.4);
    },

    onClick: function () {
        if (GameStates.gameState === GameStates.PLACE_ARMIES) {
            if (this.owner === GameStates.currentPlayer && GameStates.currentPlayer.armiesToPlace > 0) {
                this.addArmies(1);
                GameStates.currentPlayer.addArmies(1);
                GameStates.currentPlayer.armiesToPlace--;
                if (GameStates.currentPlayer.armiesToPlace === 0) {
                    GameStates.continueBtn.visible = true;
                }
            }
        } else if (GameStates.gameState === GameStates.ATTACK) {
            if (!GameStates.movedArmies) {
                if (GameStates.arrow) {
                    GameStates.arrow.kill();
                    GameStates.arrow = null;
                }
                if (this.owner === GameStates.currentPlayer && GameStates.attackingTerritory !== this) {
                    GameStates.attackingTerritory = this;
                    console.log('Attacking territory', GameStates.attackingTerritory);
                } else {
                    if (checkBorderTerritories(GameStates.attackingTerritory, this)) {
                        this.setMoveArmyBtnsVisibleFalse();
                        GameStates.defendingTerritory = this;
                        drawArrow(this.game);
                        console.log('Defending territory');
                    } else {
                        GameStates.defendingTerritory = null;
                    }
                }
                if (GameStates.attackingTerritory && GameStates.defendingTerritory) {
                    if (checkBorderTerritories(GameStates.attackingTerritory, GameStates.defendingTerritory)) {
                        GameStates.attackBtn.visible = true;
                    }
                }
            }
        } else if (GameStates.gameState === GameStates.FORTIFYING) {
            if (!GameStates.movedArmies) {
                if (GameStates.arrow) {
                    GameStates.arrow.kill();
                    GameStates.arrow = null;
                }
                if (this.owner === GameStates.currentPlayer) {
                    this.destroyMoveArmyBtns();
                    if (GameStates.attackingTerritory === null && this.armies > 1) {
                        GameStates.attackingTerritory = this;
                    } else if (GameStates.attackingTerritory) {
                        if (checkIfTerritoriesAreConnected(GameStates.attackingTerritory, this)) {
                            GameStates.defendingTerritory = this;
                            GameStates.continueBtn.visible = false;
                            drawArrow(this.game);
                            getMaxArmiesToAssign(GameStates.attackingTerritory);
                            this.createMoveArmyBtns();
                        }
                    } else if (GameStates.attackingTerritory === this || GameStates.defendingTerritory === this) {
                        GameStates.attackingTerritory = null;
                        GameStates.defendingTerritory = null;
                    }
                }

            }
        }
        setInstructionText();
    },

    setOwner: function (player) {
        if (this.owner && this.owner.territoriesOwned) {
            for (var i = 0; i < this.owner.territoriesOwned.length; i++) {
                if (this.owner.territoriesOwned[i] === this) {
                    this.owner.territoriesOwned.splice(i, 1);
                    break;
                }
            }
        }
        this.owner = player;
        player.territoriesOwned.push(this);
        this.changeTexture(player.color);
    },

    changeTexture: function (color) {
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
    },

    setBorderTerritories: function (borderTerritories) {
        this.borderTerritories = borderTerritories;
    },

    createOkButton: function () {
        this.okBtn = this.game.add.button(GameStates.defendingTerritory.positionX, GameStates.defendingTerritory.positionY + 24, 'okBtn', this.okOnClick, this);
        this.okBtn.anchor.setTo(0.5);
    },

    okOnClick: function () {
        GameStates.movedArmies = false;
        GameStates.defendingTerritory = null;
        GameStates.attackingTerritory = null;
        this.addArmyBtn.visible = false;
        this.removeArmyBtn.visible = false;
        this.okBtn.visible = false;
        GameStates.arrow.kill();
        GameStates.arrow = null;

        setInstructionText();
        GameStates.continueBtn.visible = true;
    },

    createMoveArmyBtns: function () {
        this.addArmyBtn = this.game.add.button(this.positionX + 24, this.positionY, 'addArmiesBtn', this.addArmyOnClick, this);
        this.addArmyBtn.anchor.setTo(0.5);

        this.removeArmyBtn = this.game.add.button(this.positionX - 24, this.positionY, 'removeArmiesBtn', this.removeArmyOnClick, this);
        this.removeArmyBtn.anchor.setTo(0.5);
        this.removeArmyBtn.visible = false;

        this.createOkButton();
    },

    addArmyOnClick: function () {
        GameStates.movedArmies = true;

        moveArmies(GameStates.attackingTerritory, GameStates.defendingTerritory, 1);

        GameStates.maxArmiesToAssign--;
        if (GameStates.maxArmiesToAssign === 0) {
            this.addArmyBtn.visible = false;
        }
        this.removeArmyBtn.visible = true;
    },

    removeArmyOnClick: function () {
        moveArmies(GameStates.defendingTerritory, GameStates.attackingTerritory, 1);
        GameStates.maxArmiesToAssign++;
        if (GameStates.gameState === GameStates.ATTACK && GameStates.defendingTerritory.armies === GameStates.prePlacedArmies) {
            this.removeArmyBtn.visible = false;
        } else if (GameStates.defendingTerritory.armies === 1) {
            this.removeArmyBtn.visible = false;
        }
        this.addArmyBtn.visible = true;
    },

    setMoveArmyBtnsVisibleFalse: function () {
        if (this.addArmyBtn) {
            this.addArmyBtn.visible = false;
        }
        if (this.removeArmyBtn) {
            this.removeArmyBtn.visible = false;
        }
        if (this.okBtn) {
            this.okBtn.visible = false;
        }
    },

    destroyMoveArmyBtns: function () {
        for (var i = 0; i < GameStates.territories.length; i++) {
            if (GameStates.territories[i].addArmyBtn) {
                GameStates.territories[i].addArmyBtn.destroy();
            }
            if (GameStates.territories[i].removeArmyBtn) {
                GameStates.territories[i].removeArmyBtn.destroy();
            }
            if (GameStates.territories[i].okBtn) {
                GameStates.territories[i].okBtn.destroy();
            }
        }
    }
};









