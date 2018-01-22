GameStates.Game = function (game) {

};

var mapLeeuwarden;
var continueBtn;


GameStates.Game.prototype = {
    drawCircles: drawCircles,
    create: function () {
        this.stage.backgroundColor = '4488AA';
        
        mapLeeuwarden = this.add.sprite(this.world.centerX, this.world.centerY, 'mapLeeuwarden');
        mapLeeuwarden.anchor.setTo(0.5, 0.5);

        continueBtn = this.add.button(this.world.centerX, this.world.centerY, 'continueBtn', this.continueOnClick, this);
        continueBtn.anchor.setTo(-2, -1.5);
        
        //circleGraphics = this.add.graphics(0, 0);
        
        assignTerritories();
        //drawCircles();


        newGame(this);
    },
    continueOnClick: function () {
        territories[0].changeCircleColor();
       
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
