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
        if (players.length < GameStates.MAX_PLAYERS) {
            var nameInput = $("#name").val();
            console.log(nameInput);
            var color = getColorFromCOLORS();
            value = validateNameInput(nameInput);
            if (value) {
                addPlayer(0, value, color);
                if (players.length === GameStates.MAX_PLAYERS) addPlayerBtn.visible = false;
                document.getElementById("overview").innerHTML += value + " " + color + "</br>";
            }
            $("#name").val('');
        }
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
};

function getColorFromCOLORS(){
    return GameStates.COLORS[players.length];
}

function checkIfPlayerNameExists(nameInput){
    for(var i = 0; i < players.length; i++)
    {
        if(nameInput.toLowerCase() === players[i].name.toLowerCase()) {
            return true;
        }
    }
}

function validateNameInput (nameInput) {
    var message;
    message = document.getElementById("message");
    message.innerHTML = "";
    var playerNameExists = checkIfPlayerNameExists(nameInput);

    if (nameInput === "") {
        message.innerHTML = "Name can not be empty!";
    }
    else if (!isNaN(nameInput)) {
        message.innerHTML = "Name can not contain only numbers.";
    }
    else if(playerNameExists){
        message.innerHTML = "Name already exists, please choose a different name."
    }
    else {
        return nameInput;
    }
}