GameStates.MainMenu = function (game) {
    
};

var createGameBtn;
var creditsBtn;

GameStates.MainMenu.prototype = {
    create: function () {
        // create main menu text and images -
        // create a "Start Game" mechanism - variety of ways to do this...

        //this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "Press Enter to start", { font: "20px monospace", fill: "#fff" });
        //this.loadingText.anchor.setTo(0.5, 0.5);
        
        
        createGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'createGameBtn', this.createGameBtnOnClick, this);
        creditsBtn = this.add.button(this.world.centerX, this.world.centerY, 'creditsBtn', this.creditsBtnOnClick, this);
        createGameBtn.anchor.setTo(0.6, 3);
        creditsBtn.anchor.setTo(0.7, 0.5);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.playGame, this);
    },

    playGame: function () {
        //this.state.start('Game');
    },

    createGameBtnOnClick: function() {
        this.state.start('Game');
    },

    creditsBtnOnClick: function() {
        this.state.start('Credit');
    }
};