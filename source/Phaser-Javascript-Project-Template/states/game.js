GameStates.Game = function (game) {

};

GameStates.Game.prototype = {
    create: function () {
        this.stage.backgroundColor = '4488AA';

        var mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
        mapLeeuwarden.anchor.setTo(0.5);

        GameStates.continueBtn = this.add.button(730, 475, 'continueBtn', this.continueOnClick, this);
        GameStates.continueBtn.anchor.setTo(0.5);
        GameStates.continueBtn.visible = false;
  
        GameStates.attackBtn = this.add.button(730, 425, 'attackBtn', this.attackOnClick, this);
        GameStates.attackBtn.anchor.setTo(0.5);
        GameStates.attackBtn.visible = false;

        GameStates.circleGroup = this.game.add.group();
        GameStates.circleTextGroup = this.game.add.group();

        var style = {
            font: '30px Arial',
            align: 'left'
        };

        GameStates.currentPlayerText = this.game.add.text(70, 0, '', style);
        GameStates.instructionText = this.game.add.text(70, 460, '', style);


        for (var i = 0; i < GameStates.territories.length; i++) {
            GameStates.territories[i].create();
        }

        assignTerritories();
        newGame(this);
    },
    continueOnClick: function () {
        if (checkIfGameOver()) {
            this.state.start('EndScreen');
        }

        if (GameStates.arrow) {
            GameStates.arrow.kill();
            GameStates.arrow = null;
        }

        if (GameStates.currentPlayer.type === 0) {
            if (GameStates.gameState !== GameStates.END_TURN)
                GameStates.gameState++;

            if (GameStates.gameState === GameStates.FORTIFYING) {
                GameStates.attackBtn.visible = false;
            } else if (GameStates.gameState === GameStates.END_TURN) {
                if (GameStates.defendingTerritory) {
                    GameStates.defendingTerritory.setMoveArmyBtnsVisibleFalse();
                }
                endTurn();
            }
        } else {
            endTurn();
        }

        GameStates.attackingTerritory = null;
        GameStates.defendingTerritory = null;
        setInstructionText();
    },

    attackOnClick: function () {
        var battleResult = attackTerritory();

        if (!_.isEmpty(battleResult))
            this.showBattleResult(battleResult.attackResult, battleResult.defenseResult);

        if (battleResult.conqueredTerritory) {
            if (GameStates.attackingTerritory.armies > 1) {
                GameStates.continueBtn.visible = false;
                GameStates.defendingTerritory.createMoveArmyBtns();
            }
        }
    },

    showBattleResult: function (attackResult, defenseResult) {
        var attackDice = [];
        var defenseDice = [];

        for (var i = 0; i < attackResult.length; i++) {
            var attackDieName = '';
            if (attackResult[i] === 1) {
                attackDieName = 'attack_die_1';
            } else if (attackResult[i] === 2) {
                attackDieName = 'attack_die_2';
            } else if (attackResult[i] === 3) {
                attackDieName = 'attack_die_3';
            } else if (attackResult[i] === 4) {
                attackDieName = 'attack_die_4';
            } else if (attackResult[i] === 5) {
                attackDieName = 'attack_die_5';
            } else if (attackResult[i] === 6) {
                attackDieName = 'attack_die_6';
            }
            attackDice.push(this.add.sprite(100 + i * 60, 350, attackDieName));
            attackDice[i].anchor.setTo(0.5);
            attackDice[i].lifespan = 3000;

            this.add.tween(attackDice[i]).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
        }
        for (var j = 0; j < defenseResult.length; j++) {
            var defenseDieName = '';
            if (defenseResult[j] === 1) {
                defenseDieName = 'defense_die_1';
            } else if (defenseResult[j] === 2) {
                defenseDieName = 'defense_die_2';
            } else if (defenseResult[j] === 3) {
                defenseDieName = 'defense_die_3';
            } else if (defenseResult[j] === 4) {
                defenseDieName = 'defense_die_4';
            } else if (defenseResult[j] === 5) {
                defenseDieName = 'defense_die_5';
            } else if (defenseResult[j] === 6) {
                defenseDieName = 'defense_die_6';
            }
            defenseDice.push(this.add.sprite(100 + j * 60, 410, defenseDieName));
            defenseDice[j].anchor.setTo(0.5);
            defenseDice[j].lifespan = 3000;
            this.add.tween(defenseDice[j]).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
        }
        console.log(attackResult, defenseResult);
    },


    update: function () { },

    render: function () { }
};

function drawArrow(game) {
    var attackingTerritoryPoint = {
        x: GameStates.attackingTerritory.positionX,
        y: GameStates.attackingTerritory.positionY
    };

    var defendingTerritoryPoint = {
        x: GameStates.defendingTerritory.positionX,
        y: GameStates.defendingTerritory.positionY
    };

    var angle = getAngle(attackingTerritoryPoint, defendingTerritoryPoint);
    var distance = getDistance(attackingTerritoryPoint, defendingTerritoryPoint);
    var midPoint = getMidPoint(attackingTerritoryPoint, defendingTerritoryPoint);

    var arrow = game.add.sprite(midPoint.x, midPoint.y, 'arrow_shaft');
    arrow.anchor.setTo(0.5);
    var arrowHead = game.add.sprite(0, -30, 'arrow_head');
    arrowHead.anchor.setTo(0.5, 1);
    arrow.addChild(arrowHead);
    arrow.height = distance - 30;
    arrow.angle = angle - 180;

    GameStates.arrow = arrow;
}





