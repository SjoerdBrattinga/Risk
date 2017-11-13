GameStates.CreateGame = function (game) {

};

var startGameBtn;

GameStates.CreateGame.prototype = {
    create: function () {
        //this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "Press Enter to start", { font: "20px monospace", fill: "#fff" });
        //this.loadingText.anchor.setTo(0.5, 0.5);
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'startGameBtn', this.actionOnClick, this);
    },
    playGame: function () {
        this.state.start('Game');
    },
    actionOnClick: function() {
        this.playGame();
    }
};