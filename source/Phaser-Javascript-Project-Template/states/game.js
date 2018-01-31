GameStates.Game = function (game) {

};

//var mapLeeuwarden;
var continueBtn;
var isFirstClick = true;
var circleGroup;
var circleTextGroup;

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
        //if (isFirstClick) {
        //    newGame(this);
        //    isFirstClick = false;
        //    continueBtn.visible = false;
        //}
        //if (GameStates.gameState === GameStates.GAME_OVER) {
        //    this.state.start('MainMenu');
        //}
        //var gameOver = checkIfGameOver();
        if (checkIfGameOver()) {
            this.state.start('EndScreen');
        }
        GameStates.attackingTerritory = null;
        GameStates.defendingTerritory = null;

        if ($('#form2').is(':visible'))
            $('#form2').hide();

        if (currentPlayer.type === 0) {
            if (GameStates.gameState !== GameStates.END_TURN)
                GameStates.gameState++;

            if (GameStates.gameState === GameStates.PLACE_ARMIES) {
                //continueBtn.visible = false;
            } else if (GameStates.gameState === GameStates.FORTIFYING) {
                //GameStates.gameState++;
                moveArmyBtn.visible = false;
                attackBtn.visible = false;
            }

            if (GameStates.gameState === GameStates.END_TURN) {
                endTurn();
                //continueBtn.visible = false;
            }
        } else {
            endTurn();
        }

        setInstructionText();

    },

    moveArmyOnClick: function () {
        //TODO: This also needs to be implemented for the bots so after the bots turn has ended it does NOT show this button and textbox.
        var val = $('#number').val();
        var armyNumberToMove = parseInt(val);

        if (armyNumberToMove >= minArmiesToAssign && armyNumberToMove <= maxArmiesToAssign) {
            moveArmies(GameStates.attackingTerritory, GameStates.defendingTerritory, armyNumberToMove);
            $('#form2').hide();
            //moveArmyBtn.visible = false;
        }
        GameStates.attackingTerritory = null;
        GameStates.defendingTerritory = null;
        if (GameStates.gameState === GameStates.FORTIFYING) {
            GameStates.gameState++;
            //endTurn();
            // moveArmyBtn.visible = false;
            //this.continueOnClick();
        }
        moveArmyBtn.visible = false;
        $('#number').val('');
        setInstructionText();
    },

    attackOnClick: function () {
        var battleResult = attackTerritory();
        if (!_.isEmpty(battleResult))
            this.showBattleResult(battleResult.attackResult, battleResult.defenseResult);
    },
    attackDice: [],
    defenseDice: [],
    showBattleResult: function (attackResult, defenseResult) {
        for (var k = 0; k < this.attackDice.length; k++) {
            this.attackDice[k].kill();
        }
        for (var l = 0; l < this.defenseDice.length; l++) {
            this.defenseDice[l].kill();
        }
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

            this.attackDice.push(this.add.sprite(this.world.centerX - 350 + i * 60, 350, attackDieName));
            this.attackDice[i].anchor.setTo(0.5);

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

            this.defenseDice.push(this.add.sprite(this.world.centerX - 350 + j * 60, 420, defenseDieName));
            this.defenseDice[j].anchor.setTo(0.5);

        }
        console.log(attackResult, defenseResult);
    },

    update: function () {
        if (GameStates.gameState === GameStates.GAME_OVER) {
            this.state.start('EndScreen');
        }
    },

    render: function () { }
};







