GameStates.Instructions = function (game) {

};

var text;
var backBtn;

GameStates.Instructions.prototype = {
    create: function () {
        text = this.add.text(100, 100, 'Instructions on how the game is played:', {
            fontSize: '32px', fill: '#fff'});
        backBtn = this.add.button(this.world.centerX, this.world.centerY, 'backBtn', this.returnOnClick, this);
        backBtn.anchor.setTo(-2, 0.2);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};