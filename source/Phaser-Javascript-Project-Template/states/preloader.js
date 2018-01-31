// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function(game) {
    this.preloadBar = null;
};

GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.image('riskWorldGraph', 'assets/595px-Risk_Game_Graph.png');
        this.load.image('mapLeeuwarden', 'assets/spritesheets/LWD.png');
        this.load.image('createGameBtn', 'assets/button_create-new-game.png');
        this.load.image('creditsBtn', 'assets/button_credits.png');
        this.load.image('startGameBtn', 'assets/button_start-game.png');
        this.load.image('gameInstructionsBtn', 'assets/button_game-instructions.png');
        this.load.image('mainmenu-background', 'assets/mainmenu-background.jpg');
        this.load.image('creategame-background', 'assets/creategame-background.jpg');
        this.load.image('backBtn', 'assets/button_return.png');
        this.load.image('continueBtn', 'assets/button_continue.png');
        this.load.image('addPlayerBtn', 'assets/button_add-player.png');
        this.load.image('addEasyBotBtn', 'assets/button_easy.png');
        this.load.image('addAverageBotBtn', 'assets/button_average.png');
        this.load.image('addHardBotBtn', 'assets/button_hard.png');
        this.load.image('removePlayer1Btn', 'assets/button_remove-player.png');
        this.load.image('removePlayer2Btn', 'assets/button_remove-player.png');
        this.load.image('removePlayer3Btn', 'assets/button_remove-player.png');
        this.load.image('removePlayer4Btn', 'assets/button_remove-player.png');
        this.load.image('removePlayer5Btn', 'assets/button_remove-player.png');
        this.load.image('removePlayer6Btn', 'assets/button_remove-player.png');
        this.load.image('moveArmyBtn', 'assets/button_move-army.png');
        this.load.image('attackBtn', 'assets/button_attack.png');
        this.load.image('blue_circle',   'assets/circles/blue_circle.png');
        this.load.image('green_circle',  'assets/circles/green_circle.png');
        this.load.image('orange_circle', 'assets/circles/orange_circle.png');
        this.load.image('purple_circle', 'assets/circles/purple_circle.png');
        this.load.image('red_circle',    'assets/circles/red_circle.png');
        this.load.image('brown_circle', 'assets/circles/brown_circle.png');
        this.load.image('add_armies', 'assets/button_add-army.png');
        this.load.image('remove_armies', 'assets/button_remove-army.png');
        this.load.image('attack_die_1', 'assets/dice/attack_die_1.png');
        this.load.image('attack_die_2', 'assets/dice/attack_die_2.png');
        this.load.image('attack_die_3', 'assets/dice/attack_die_3.png');
        this.load.image('attack_die_4', 'assets/dice/attack_die_4.png');
        this.load.image('attack_die_5', 'assets/dice/attack_die_5.png');
        this.load.image('attack_die_6', 'assets/dice/attack_die_6.png');
        this.load.image('defense_die_1', 'assets/dice/defense_die_1.png');
        this.load.image('defense_die_2', 'assets/dice/defense_die_2.png');
        this.load.image('defense_die_3', 'assets/dice/defense_die_3.png');
        this.load.image('defense_die_4', 'assets/dice/defense_die_4.png');
        this.load.image('defense_die_5', 'assets/dice/defense_die_5.png');
        this.load.image('defense_die_6', 'assets/dice/defense_die_6.png');
    },

    create: function () {
        //call next state
        $('#form1').hide();
        $('#form2').hide();
        this.state.start('MainMenu');

    }
};