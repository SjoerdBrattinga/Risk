GameStates.Credit = function (game) {

};

GameStates.Credit.prototype = {
    create: function () {
        var text = this.add.text(this.world.centerX, 170, 'Made by:', {
            fontSize: '32px', fill: '#fff'
        });
        text.anchor.setTo(0.5);

        var text1 = this.add.text(this.world.centerX, 230, 'Sjoerd', {
            fontSize: '32px', fill: '#fff'
        });
        text1.anchor.setTo(0.5);

        var text2 = this.add.text(this.world.centerX, 260, '&', {
            fontSize: '32px', fill: '#fff'
        });
        text2.anchor.setTo(0.5);

        var text3 = this.add.text(this.world.centerX, 290, 'Benjamin', {
            fontSize: '32px', fill: '#fff'
        });
        text3.anchor.setTo(0.5);

        var backBtn = this.add.button(this.world.centerX, 450, 'backBtn', this.returnOnClick, this);
        backBtn.anchor.setTo(0.5);
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }

};