GameStates.EndScreen = function (game) {

};

GameStates.EndScreen.prototype = {
    create: function () {

        var backGround = this.add.sprite(this.world.centerX, this.world.centerY, 'creategame-background');
        backGround.anchor.setTo(0.5, 0.5);

        var text = this.add.text(this.world.centerX, 70, 'VICTORY!', {
            fontSize: '150px', fill: currentPlayer.color});
        text.anchor.setTo(0.5);
        var text2 = this.add.text(this.world.centerX, 180, currentPlayer.name + ' conquered Leeuwarden!', {
            fontSize: '40px', fill: currentPlayer.color});
        text2.anchor.setTo(0.5);
        var continueBtn = this.add.button(765, 304, 'continueBtn', this.returnOnClick, this);
        continueBtn.anchor.setTo(0.5);

        $('#form1').hide();
        $('#form2').hide();
    },

    returnOnClick: function () {
        this.state.start('MainMenu');
    }
};