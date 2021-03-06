GameStates.Instructions = function (game) {

};

GameStates.Instructions.prototype = {
    create: function () {
        this.add.text(100, 80, 'Instructions on how the game is played:', {
            fontSize: '32px', fill: '#fff'
        });
        this.add.text(100, 120, 'First we place armies on territories.', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 145, 'Select a territory which you want to attack from.', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 170, 'Select a territory which you want to attack.', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 195, 'Repeat until you are satisfied and want to continue to fortifying', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 220, 'Last but not least, we need to make sure', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 245, 'our territories are fortified', {
            fontSize: '25px', fill: '#fff'
        });
        this.add.text(100, 270, 'Note: attack dice are red, defense dice are blue', {
            fontSize: '25px', fill: '#fff'
        });

        var backBtn = this.add.button(this.world.centerX, 450, 'backBtn', this.returnOnClick, this);
        backBtn.anchor.setTo(0.5);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};