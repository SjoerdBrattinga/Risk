GameStates.EndScreen = function (game) {

};

var text;
var text;
var continueBtn;

GameStates.EndScreen.prototype = {
    create: function () {
        text = this.add.text(100, 100, 'You win / lose!', {
            fontSize: '32px', fill: '#fff'});
        text = this.add.text(100, 130, 'Good job / Better luck next time!', {
            fontSize: '32px', fill: '#fff'});
        continueBtn = this.add.button(this.world.centerX, this.world.centerY, 'continueBtn', this.returnOnClick, this);
        continueBtn.anchor.setTo(-2, 0.2);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};