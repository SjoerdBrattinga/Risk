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
    },

    startGameOnClick: function () {
        this.state.start('Game');
    },

    addPlayerOnClick: function () {
        addPlayer(0, 'sjors', 'yellow');
    }
};

function assignTerritories() {
    var numberOfTerritories = Math.floor(territories.length / players.length);
    var leftOverTerritories = territories.length % players.length;
    for (var i = 0; i < territories.length; i++) {
        if (territories[i].getOwner() !== undefined) {
            var player = getRandomPlayer();
            territories[i].setOwner(player);
        }
    }
}