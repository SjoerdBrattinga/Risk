GameStates.CreateGame = function (game) {

};

var text;
var startGameBtn;
var addPlayerBtn;
$("#name").val('');
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
        $(document).ready(function(){
                var value = $("#name").val();
                console.log(value);
                $("#form1").hide();

        });
    },
};