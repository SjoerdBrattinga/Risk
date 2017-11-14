GameStates.MainMenu = function (game) {
    
};

var mainMenuBackground;
var createGameBtn;
var gameInstructionsBtn;
var creditsBtn;

GameStates.MainMenu.prototype = {
    create: function () {
        // create main menu text and images -
        // create a "Start Game" mechanism - variety of ways to do this...

        //this.loadingText = this.add.text(this.game.width / 2, this.game.height / 2, "Press Enter to start", { font: "20px monospace", fill: "#fff" });
        //this.loadingText.anchor.setTo(0.5, 0.5);

        mainMenuBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'mainmenu-background');
        mainMenuBackground.anchor.setTo(0.5, 0.5);
        createGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'createGameBtn', this.createGameBtnOnClick, this);
        gameInstructionsBtn = this.add.button(this.world.centerX, this.world.centerY, 'gameInstructionsBtn', this.createGameInstructionsBtnOnClick, this);
        creditsBtn = this.add.button(this.world.centerX, this.world.centerY, 'creditsBtn', this.createCreditsBtnOnClick, this);
        createGameBtn.anchor.setTo(0.6, 4);
        gameInstructionsBtn.anchor.setTo(0.6, 2);
        creditsBtn.anchor.setTo(0.7, -1.5);
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.enterKey.onDown.add(this.createGameBtnOnClick, this);
    },

    // playGame: function () {
    //   //this.state.start('Game');
    // },

      createGameBtnOnClick: function() {
        this.state.start('CreateGame');
    },

    createGameInstructionsBtnOnClick: function () {
        this.state.start('Instructions');
    },

    createCreditsBtnOnClick: function() {
        this.state.start('Credit');
    }
};