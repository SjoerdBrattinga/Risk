GameStates.Game = function (game) {

};

var mapLeeuwarden;
var continueBtn;
var circleGroup;
var circleTextGroup;
var armyNumberToMove;

GameStates.Game.prototype = {
    drawCircles: drawCircles,
    create: function () {
        this.stage.backgroundColor = '4488AA';

        mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
        mapLeeuwarden.anchor.setTo(0.5, 0.5);

        continueBtn = this.add.button(this.world.centerX, this.world.centerY, 'continueBtn', this.continueOnClick, this);
        continueBtn.anchor.setTo(-2, -1.5);

        moveArmyBtn = this.add.button(this.world.centerX, this.world.centerY, 'moveArmyBtn', this.moveArmyOnClick, this);
        moveArmyBtn.anchor.setTo(1,1);

        circleGroup = this.game.add.group();
        circleTextGroup = this.game.add.group();

        for (var i = 0; i < territories.length; i++) {
            territories[i].create();
        }
        assignTerritories();
        newGame(this);
    },
    continueOnClick: function () {
        territories[0].setOwner(getRandomPlayer());

    },

    moveArmyOnClick: function () {
        var armyNumberToMove = $('#number').val();
        armyNumberToRemove = parseInt(armyNumberToMove);
        moveArmies(attackingTerritory, defendingTerritory, armyNumberToRemove);
        if (armyNumberToMove >= minArmiesToAssign && armyNumberToRemove <= maxArmiesToAssign) {
            $('#form2').hide();
        }
    },

    update: function () {
        //for (var i = 0; i < territories.length; i++) {
        //    territories[i].setArmieText();
        //}
    },

    render: function () { }
};

function drawCircles() {
    for (var i = 0; i < territories.length; i++) {
        territories[i].drawCircle();
    }
}

function DrawNumberOfArmies() {

}

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
