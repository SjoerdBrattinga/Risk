GameStates.EndScreen = function (game) {

};

var text;
var text;
var continueBtn;

GameStates.EndScreen.prototype = {
    create: function () {

        var backGround = this.add.sprite(this.world.centerX, this.world.centerY, 'creategame-background');
        backGround.anchor.setTo(0.5, 0.5);

        text = this.add.text(100, 20, 'VICTORY! ', {
            fontSize: '150px', fill: currentPlayer.color});
        text = this.add.text(110, 180, currentPlayer.name + ' conquered Leeuwarden!', {
            fontSize: '40px', fill: currentPlayer.color});
        continueBtn = this.add.button(765, 304, 'continueBtn', this.returnOnClick, this);
        continueBtn.anchor.setTo(0.5);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};