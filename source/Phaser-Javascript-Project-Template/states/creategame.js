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
        $(document).ready(function() {
            $("#form1").hide();
        });
    },

    addPlayerOnClick: function () {
        if(players.length < GameStates.MAX_PLAYERS){
            var value = $("#name").val();
            console.log(value);
            var color = getColorFromCOLORS();
            addPlayer(0, value, color);
            $("#name").val('');
        }
        if(players.length === GameStates.MAX_PLAYERS)  addPlayerBtn.visible = false;

        document.getElementById("overview").innerHTML += value + " " + color + "</br>";

    },

};
function getColorFromCOLORS(){
    return GameStates.COLORS[players.length];
}