GameStates.CreateGame = function (game) {

};

var text;
var startGameBtn;
var addPlayerBtn;
//var input;

GameStates.CreateGame.prototype = {
    create: function () {
        text = this.add.text(300, 100, 'Options:', {
            fontSize: '32px', fill: '#fff'});
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'startGameBtn', this.startGameOnClick, this);
        addPlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'addPlayerBtn', this.addPlayerOnClick, this);
        startGameBtn.anchor.setTo(0.7, 0.2);
        //Trying to get a text input field
        //debugger;
        //input = this.add.inputField(10,90);
        // input = new CanvasInput({
        //     canvas: document.getElementById('canvas')
        // });
    },

    startGameOnClick: function () {
        this.state.start('Game');
    },

    addPlayerOnClick: function () {
        addPlayer(0, 'sjors', 'yellow');
    },

    // update: function()  {
    //     this._inputField.update();
    // },


};