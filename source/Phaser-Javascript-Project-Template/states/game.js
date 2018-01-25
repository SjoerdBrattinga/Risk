GameStates.Game = function (game) {
    
};

var mapLeeuwarden;
var continueBtn;
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

        mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
        mapLeeuwarden.anchor.setTo(0.5);

        continueBtn = this.add.button(730, 475, 'continueBtn', this.continueOnClick, this);
        continueBtn.anchor.setTo(0.5);

        var style = {
            font: '30px Arial',
            align: 'left'
        };
        currentPlayerText = this.game.add.text(70, 0, '', style);
        instructionText = this.game.add.text(70, 460, '', style);

        //gameText.anchor.setTo(0.5);

        moveArmyBtn = this.add.button(730, 475, 'moveArmyBtn', this.moveArmyOnClick, this);
        moveArmyBtn.anchor.setTo(0.5);
        moveArmyBtn.visible = false;

        attackBtn = this.add.button(730, 475, 'attackBtn', this.attackOnClick, this);
        attackBtn.anchor.setTo(0.5);
        attackBtn.visible = false;
        //attackBtn.visible = false;

        circleGroup = this.game.add.group();
        circleTextGroup = this.game.add.group();

        for (var i = 0; i < territories.length; i++) {
            territories[i].create();
        }
        assignTerritories();
        newGame(this);
    },
    continueOnClick: function () {
        endTurn();
        //territories[0].setOwner(getRandomPlayer());

    },

    moveArmyOnClick: function () {
        var val = $('#number').val();
        var armyNumberToMove = parseInt(val);
        moveArmies(GameStates.attackingTerritory, GameStates.defendingTerritory, armyNumberToMove);
        if (armyNumberToMove >= minArmiesToAssign && armyNumberToMove <= maxArmiesToAssign) {
            $('#form2').hide();
            moveArmyBtn.visible = false;
        }
    },

    attackOnClick: function() {
        attackTerritory();
    },

    update: function () {
        
    },

    render: function () { }
};

//function drawCircles() {
//    for (var i = 0; i < territories.length; i++) {
//        territories[i].drawCircle();
//    }
//}


function assignTerritories() {
    shuffle(territories);

    var count = 0;
    for (var i = 0; i < territories.length; i++) {
        territories[i].setOwner(players[count]);
        count++;
        if (count === players.length) count = 0;
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
