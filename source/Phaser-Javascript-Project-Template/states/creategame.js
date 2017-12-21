GameStates.CreateGame = function (game) {

};

var text;
var startGameBtn;
var addPlayerBtn;
var removePlayerBtn;
var mess;
var count;
var textp1;
$("#name").val('');
//var input;

GameStates.CreateGame.prototype = {
    create: function () {
        text = this.add.text(300, 100, 'Options:', {
            fontSize: '32px', fill: '#fff'
        });
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY, 'startGameBtn', this.startGameOnClick, this);
        addPlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'addPlayerBtn', this.addPlayerOnClick, this);
        //removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY, 'removePlayerBtn', this.removePlayerOnClick, this);
        startGameBtn.anchor.setTo(0.7, 0.2);
        addPlayerBtn.anchor.setTo(0.7, 2);


        var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        player1 = this.game.add.text(0,0," ", style);
        player2 = this.game.add.text(0,0," ",style);
        player3 = this.game.add.text(0,0," ",style);
        player4 = this.game.add.text(0,0," ", style);
        player5 = this.game.add.text(0,0," ",style);
        player6 = this.game.add.text(0,0," ",style);
        //message.setShadow(3,3, 'rgba(0,0,0,0,5)', 2);
        player1.setTextBounds(0, 100, 600, 100);
        player2.setTextBounds(0, 150, 600, 100);
        player3.setTextBounds(0, 200, 600, 100);
        player4.setTextBounds(0, 250, 600, 100);
        player5.setTextBounds(0, 300, 600, 100);
        player6.setTextBounds(0, 350, 600, 100);
        //player1.setBackgroundColor(3,3, 'rgba(255,255,255)', 2);
        //removePlayerBtn.anchor.setTo(3.5, 2);

        // var bar = this.add.graphics();
        // bar.beginFill(0x000000, 0.2);
        // bar.drawRect(0, 100, 800, 100);
        //
        // var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        //
        // //var mess = "Test tekst";
        // //  The Text is positioned at 0, 100
        // count = 0;
        //
        // textp1 = this.add.text(375, 0, "- You have clicked -\n0 times !", style);
        // textp2 = this.add.text(375, 30, "Test 2", style);
        // textp3 = this.add.text(375, 60, "Test 3", style);
        // textp4 = this.add.text(375, 90, "Test 4", style);
        // textp5 = this.add.text(375, 120, "Test 5", style);
        // textp6 = this.add.text(375, 150, "Test 6", style);
        // //text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        //
        // //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        // text.setTextBounds(0, 100, 800, 100);

        text.anchor.setTo(0.5, 0.5);

            $("#form1").show();
    },

    startGameOnClick: function () {
        var checkNumberOfPlayers = checkIfEnoughPlayersAreAdded();
        //players.push(new Player());
        //players.push(new Player());
        //players.push(new Player());
        assignTerritories();
        this.state.start('Game');
        $(document).ready(function () {
            $("#form1").hide();
        });
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
                if(players.length === 1){
                    player1.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/2, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if(players.length == 2){
                    player2.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/2.8, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if(players.length == 3){
                    player3.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/3.3, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if(players.length == 4){
                    player4.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/3.7, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if(players.length == 5){
                    player5.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/3.9, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if(players.length == 6){
                    player6.setText(player.name + " " + player.color);
                    removePlayerBtn = this.add.button(this.world.centerX, this.world.centerY*players.length/4.0, 'removePlayerBtn', function(){
                        removePlayer(player.name);
                        if(players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                console.log(player, 'added');
                console.log(players);
                if (players.length === GameStates.MAX_PLAYERS) {
                    addPlayerBtn.visible = false;
                    $("#form1").hide();
                }
                this.showPlayers(player);
            }
            $("#name").val('');
        }
    },
    showPlayers: function(player){
        message = document.getElementById("overview");
        console.log(players);
        var haiku = "Turtles and mushrooms\nYou are in the wrong castle\nFireball mustache";
        // var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
        // message = this.game.add.text(0,0,"TEKST ", style);
        // message.setShadow(3,3, 'rgba(0,0,0,0,5)', 2);
        // message.setTextBounds(0, 100, 600, 100);
        var bar = this.game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);



        //var mess = "Test tekst";
        //  The Text is positioned at 0, 100
        // text = this.game.add.text(0, 0, "Test tekst", style);
        // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

        //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
        //text.setTextBounds(0, 100, 800, 100);
    },

    removePlayerOnClick: function(name) {
        debugger;
        removePlayer(name);

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

