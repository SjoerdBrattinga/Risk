window.onload = function () {

    //Can get scaling to windowscreen by using window.innerWidth & window.innerHeight
    var game = new Phaser.Game(900, 506, Phaser.AUTO, '');

    //  Add the States your game has.
    game.state.add('Boot', GameStates.Boot);
    game.state.add('Preloader', GameStates.Preloader);
    game.state.add('MainMenu', GameStates.MainMenu);
    game.state.add('CreateGame', GameStates.CreateGame);
    game.state.add('Game', GameStates.Game);
    game.state.add('Credit', GameStates.Credit);
    game.state.add('Instructions', GameStates.Instructions);
    game.state.add('EndScreen', GameStates.EndScreen);

    //  Now start the Boot state.
    game.state.start('Boot');

};