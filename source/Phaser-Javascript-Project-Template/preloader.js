// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
}

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.image('riskWorldGraph', 'assets/595px-Risk_Game_Graph.png');
        this.load.image('createGameBtn', 'assets/button_create-new-game.png');
        this.load.image('creditsBtn', 'assets/button_credits.png');
        this.load.image('startGameBtn', 'assets/button_start-game.png');
        this.load.image('gameInstructionsBtn', 'assets/button_game-instructions.png');
    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
    }
};