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
        
        var circle = this.add.graphics(0, 0);
        drawCircles(circle);

        newGame();
    },
    continueOnClick: function () {
        //this.state.start('EndScreen');
    },

    update: function () {
        //if (gameState === GameStates.PLACE_ARMIES) {
        //    //console.log("place armies");

        //}
        //if (gameState === GameStates.ATTACK) {
        //    //console.log('attack');

        //}
        //if (gameState === GameStates.FORTIFYING) {
        //    //console.log('fortifying');

        //}
        //if (gameState === GameStates.END_TURN) {
        //    //console.log('end turn');
        //    setCurrentPlayer();

        //}
        //console.log('X:' + this.input.activePointer.x);

        //console.log('Y:' + this.input.activePointer.y);
    },

    render: function () { }
};

function drawCircles(circle) {
    
    for (var i = 0; i < territories.length; i++) {
        
        circle.beginFill(0xFF0000, 1);
        circle.drawCircle(territories[i].positionX, territories[i].positionY, 25);
    }
}
