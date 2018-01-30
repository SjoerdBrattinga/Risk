GameStates.Instructions = function (game) {

};

var text;
var backBtn;

GameStates.Instructions.prototype = {
    create: function () {
        text = this.add.text(100, 100, 'Instructions on how the game is played:', {
            fontSize: '32px', fill: '#fff'});
        text = this.add.text(100, 150, 'First we place armies on territories.', {
            fontSize: '25px', fill: '#fff'});
        text = this.add.text(100, 200, 'Now we\'re ready to attack!', {
            fontSize: '25px', fill: '#fff'});
        text = this.add.text(100, 250, 'Last but not least, we need to make sure', {
            fontSize: '25px', fill: '#fff'});
        text = this.add.text(100, 275,  'our outer territories are fortified', {
            fontSize: '25px', fill: '#fff'});
        backBtn = this.add.button(765, 304, 'backBtn', this.returnOnClick, this);
        backBtn.anchor.setTo(0.5);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};