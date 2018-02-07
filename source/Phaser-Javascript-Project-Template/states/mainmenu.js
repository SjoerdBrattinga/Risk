GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {
    create: function () {
        var mainMenuBackground = this.add.sprite(this.world.centerX, this.world.centerY, 'mainmenu-background');
        mainMenuBackground.anchor.setTo(0.5, 0.5);

        var mainMenuText = this.add.text(this.world.centerX, 30, 'Risk Leeuwarden', {
            fontSize: '40px', fill: '#fff'
        });
        mainMenuText.anchor.setTo(0.5);

        var createGameBtn = this.add.button(this.world.centerX, 200, 'createGameBtn', this.createGameBtnOnClick, this);
        createGameBtn.anchor.setTo(0.5, 0.5);

        var gameInstructionsBtn = this.add.button(this.world.centerX, 250, 'gameInstructionsBtn', this.createGameInstructionsBtnOnClick, this);
        gameInstructionsBtn.anchor.setTo(0.5, 0.5);

        var creditsBtn = this.add.button(this.world.centerX, 450, 'creditsBtn', this.createCreditsBtnOnClick, this);
        creditsBtn.anchor.setTo(0.5, 0.5);

        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(this.createGameBtnOnClick, this);
    },

    createGameBtnOnClick: function () {
        this.state.start('CreateGame');
    },

    createGameInstructionsBtnOnClick: function () {
        this.state.start('Instructions');
    },

    createCreditsBtnOnClick: function () {
        this.state.start('Credit');
    }
};