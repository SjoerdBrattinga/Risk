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
            fontSize: '32px', fill: '#fff'
        });
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'startGameBtn', this.startGameOnClick, this);
        addPlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'addPlayerBtn', this.addPlayerOnClick, this);
        startGameBtn.anchor.setTo(0.7, 0.2);
    },

    startGameOnClick: function () {
        players.push(new Player());
        players.push(new Player());
        players.push(new Player());
        assignTerritories();
        this.state.start('Game');
        $(document).ready(function () {
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

    shuffle(territories);
   
    for (var i = 0; i < players.length; i++) {
        for (var j = 0; j < territories.length; j++) {
            if (j >= numberOfTerritories * i && j < numberOfTerritories * (i + 1)) {
                players[i].territoriesOwned.push(territories[j]);
            }
        }
    }
    console.log(players[0].getTerritoriesOwned());
    console.log(players[1].getTerritoriesOwned());
    console.log(players[2].getTerritoriesOwned());
    //var count = 0;
    //while (count < numberOfTerritories) {

    //    var territory = getRandomTerritory();

    //    if (!territory.getOwner()) {
    //        territory.setOwner(players[i]);
    //        players[i].territoriesOwned.push(territory);
    //        count++;
    //    }

    //}
    //for (var i = 0; i < territories.length; i++) {
    //    if (territories[i].getOwner() !== undefined) {
    //        var player = getRandomPlayer();
    //        if (player.getTerritoriesOwned !== numberOfTerritories);
    //            territories[i].setOwner(player);

    //    }
    //}
}

function hasOwner(territory) {
    var owner = territory.getOwner();
    
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function getColorFromCOLORS() {
    return GameStates.COLORS[players.length];
}

function checkIfPlayerNameExists(nameInput) {
    for (var i = 0; i < players.length; i++) {
        if (nameInput.toLowerCase() === players[i].name.toLowerCase()) {
            return true;
        }
    }
}

function validateNameInput(nameInput) {
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
    else if (playerNameExists) {
        message.innerHTML = "Name already exists, please choose a different name."
    }
    else {
        return nameInput;
    }
}