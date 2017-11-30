GameStates.CreateGame = function (game) {

};

var text;
var startGameBtn;
var addPlayerBtn;
var removePlayerBtn;
$("#name").val('');
//var input;

GameStates.CreateGame.prototype = {
    create: function () {
        text = this.add.text(300, 100, 'Options:', {
            fontSize: '32px', fill: '#fff'});
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'startGameBtn', this.startGameOnClick, this);
        addPlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'addPlayerBtn', this.addPlayerOnClick, this);
        //removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'removePlayerBtn', this.removePlayerOnClick, this);
        startGameBtn.anchor.setTo(0.7, 0.2);
        addPlayerBtn.anchor.setTo(0.7, 2);
        //removePlayerBtn.anchor.setTo(3.5, 2);
    },

    startGameOnClick: function () {
        var checkNumberOfPlayers = checkIfEnoughPlayersAreAdded()
        if (checkNumberOfPlayers) {
            this.state.start('Game');
            $(document).ready(function () {
                $("#form1").hide();
            });
        }
    },

    addPlayerOnClick: function () {
        if (players.length < GameStates.MAX_PLAYERS) {

            var nameInput = $("#name").val();
            console.log(nameInput);
            var color = getColorFromCOLORS();
            value = validateNameInput(nameInput);
            if (value) {
                var player = addPlayer(0, value, color);
                console.log(player, 'added');
                console.log(players);
                if (players.length === GameStates.MAX_PLAYERS) addPlayerBtn.visible = false;
                this.showPlayers(player);
            }
            $("#name").val('');
        }
    },
    showPlayers: function(player){
        console.log(players);
        document.getElementById("overview").innerHTML += player.name + " " + player.color +  "</br>";
        removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/2, 'removePlayerBtn', function(){ removePlayer(player.name)}, this);
        removePlayerBtn.anchor.setTo(3, 5.8);
    },
    removePlayerOnClick: function(name) {
        debugger;
        removePlayer(name);
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

function checkIfEnoughPlayersAreAdded(){
    var message;
    message = document.getElementById("message");
    message.innerHTML = "";
    if(players.length < 1) {
       message.innerHTML = "No players added!";
    }
    else if (players.length < 2) {
        message.innerHTML = "Need atleast 2 players to play.";
    }
    else {
        return true;
    }
}