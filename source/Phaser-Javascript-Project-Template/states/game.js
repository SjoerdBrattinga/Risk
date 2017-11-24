GameStates.Game = function (game) {

};

var riskWorldGraph;
var continueBtn;

GameStates.Game.prototype = {

    create: function () {
        this.stage.backgroundColor = '4488AA';
        //below code creates a simple tween animation. You will want to delete this when adding your code
        riskWorldGraph = this.add.sprite(this.world.centerX, this.world.centerY, 'riskWorldGraph');
        riskWorldGraph.anchor.setTo(0.5, 0.5);
        continueBtn = this.add.button(this.world.centerX, this.world.centerY, 'continueBtn', this.continueOnClick, this);
        continueBtn.anchor.setTo(-2,-1.5);
        //logo.scale.setTo(0.2, 0.2);
        //this.add.tween(logo.scale).to({ x: 1, y: 1 }, 2000, Phaser.Easing.Bounce.Out, true);
        newGame();

    },

    continueOnClick: function () {
        this.state.start('EndScreen');
    },

    update: function () { },

    render: function () { }
};
