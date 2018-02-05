GameStates.Game = function (game) {

};

//var mapLeeuwarden;
var continueBtn;
var isFirstClick = true;
var circleGroup;
var circleTextGroup;
var arrow;

var currentPlayerText;
var instructionText;
//var selectedTerritory;

var moveArmyBtn;
var attackBtn;


GameStates.Game.prototype = {
    create: function () {
        this.stage.backgroundColor = '4488AA';

        var mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
        mapLeeuwarden.anchor.setTo(0.5);

        continueBtn = this.add.button(730, 475, 'continueBtn', this.continueOnClick, this);
        continueBtn.anchor.setTo(0.5);
        continueBtn.visible = false;

        var style = {
            font: '30px Arial',
            align: 'left'
        };
        currentPlayerText = this.game.add.text(70, 0, '', style);
        instructionText = this.game.add.text(70, 460, '', style);

        //gameText.anchor.setTo(0.5);

        moveArmyBtn = this.add.button(730, 425, 'moveArmyBtn', this.moveArmyOnClick, this);
        moveArmyBtn.anchor.setTo(0.5);
        moveArmyBtn.visible = false;

        attackBtn = this.add.button(730, 425, 'attackBtn', this.attackOnClick, this);
        attackBtn.anchor.setTo(0.5);
        attackBtn.visible = false;

        circleGroup = this.game.add.group();
        circleTextGroup = this.game.add.group();

        for (var i = 0; i < territories.length; i++) {
            territories[i].create();
        }
        assignTerritories();
        newGame(this);
    },
    continueOnClick: function () {

        console.log(GameStates.gameState);
        console.log(currentPlayer.name);

        if (checkIfGameOver()) {
            this.state.start('EndScreen');
        }

        if (GameStates.arrow) {
            GameStates.arrow.kill();
            GameStates.arrow = null;
        }

        if (currentPlayer.type === 0) {
            if (GameStates.gameState !== GameStates.END_TURN)
                GameStates.gameState++;

            if (GameStates.gameState === GameStates.PLACE_ARMIES) {
                //continueBtn.visible = false;
            } else if (GameStates.gameState === GameStates.FORTIFYING) {
                //GameStates.gameState++;
                //if (GameStates.defendingTerritory) {
                //    GameStates.defendingTerritory.setMoveArmyBtnsVisibleFalse();
                //}
                moveArmyBtn.visible = false;
                attackBtn.visible = false;
                
            }

            if (GameStates.gameState === GameStates.END_TURN) {
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
                continueBtn.visible = false;
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
            game.add.tween(attackDice[i]).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
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
            game.add.tween(defenseDice[j]).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true);
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





