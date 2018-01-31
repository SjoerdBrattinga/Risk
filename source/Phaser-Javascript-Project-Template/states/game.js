GameStates.Game = function (game) {
    
};

var mapLeeuwarden;
var continueBtn;
var isFirstClick = true;
var circleGroup;
var circleTextGroup;

var currentPlayerText;
var instructionText;
//var selectedTerritory;

var moveArmyBtn;
var attackBtn;
var addArmyBtn;
var removeArmyBtn;

GameStates.Game.prototype = {
    create: function () {
        this.stage.backgroundColor = '4488AA';

        mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
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
        var gameOver = checkIfGameOver();
        if (checkIfGameOver()){
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

    addArmyOnClick: function () {
        //TODO: button that on click moves 1 army from the attacking territory to the now conquered territory.
        //Should not be able to move more armies than maxArmiesToAssign.
        moveArmies(GameStates.attackingTerritory, GameStates.defendingTerritory, 1);
        maxArmiesToAssign--;
        if (maxArmiesToAssign === 0){
            addArmyBtn.visible = false;
        }
        removeArmyBtn.visible = true;
    },

    removeArmyOnClick: function () {
        //TODO: button that on click removes 1 army from conquered territory back to the attacking territory.
        //Should not be able to remove more armies than the minimum that is transfered at first.
        moveArmies(GameStates.defendingTerritory, GameStates.attackingTerritory, 1);
        maxArmiesToAssign++;
        if (GameStates.defendingTerritory.armies === prePlacedArmies) {
            removeArmyBtn.visible = false;
        }
    },

    // moveArmyOnClick: function () {
    //     //TODO: This also needs to be implemented for the bots so after the bots turn has ended it does NOT show this button and textbox.
    //     var val = $('#number').val();
    //     var armyNumberToMove = parseInt(val);
    //
    //     if (armyNumberToMove >= minArmiesToAssign && armyNumberToMove <= maxArmiesToAssign) {
    //         moveArmies(GameStates.attackingTerritory, GameStates.defendingTerritory, armyNumberToMove);
    //         $('#form2').hide();
    //         //moveArmyBtn.visible = false;
    //     }
    //     GameStates.attackingTerritory = null;
    //     GameStates.defendingTerritory = null;
    //     if (GameStates.gameState === GameStates.FORTIFYING) {
    //         GameStates.gameState++;
    //         //endTurn();
    //         // moveArmyBtn.visible = false;
    //         //this.continueOnClick();
    //     }
    //     moveArmyBtn.visible = false;
    //     $('#number').val('');
    //     setInstructionText();
    // },

    attackOnClick: function() {
        var battleResult = attackTerritory();
        if(battleResult.conqueredTerritory){
            addArmyBtn = this.add.button(GameStates.defendingTerritory.positionX + 24, GameStates.defendingTerritory.positionY, 'addArmiesBtn', this.addArmyOnClick, this);
            addArmyBtn.anchor.setTo(0.5);
            addArmyBtn.visisble = true;

            removeArmyBtn = this.add.button(GameStates.defendingTerritory.positionX - 34, GameStates.defendingTerritory.positionY, 'removeArmiesBtn', this.removeArmyOnClick, this);
            removeArmyBtn.anchor.setTo(0.5);
            removeArmyBtn.visible = false;
        }
    },

    update: function () {
        if (GameStates.gameState === GameStates.GAME_OVER) {
            this.state.start('EndScreen');
        }
    },

    render: function () { }
};







