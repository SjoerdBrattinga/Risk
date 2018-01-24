GameStates.CreateGame = function (game) {

};

var text;
var startGameBtn;
var addPlayerBtn;
var player1;
var player2;
var player3;
var player4;
var player5;
var player6;
$('#name').val('');

GameStates.CreateGame.prototype = {
    create: function () {
        setTerritories(this.game);

        text = this.add.text(155, 30, 'Set up your game.', {
            fontSize: '32px', fill: '#fff'
        });
        startGameBtn = this.add.button(this.world.centerX, this.world.centerY * 1.7, 'startGameBtn', this.startGameOnClick, this);
        addPlayerBtn = this.add.button(this.world.centerX, this.world.centerY / 3, 'addPlayerBtn', this.addPlayerOnClick, this);
        startGameBtn.anchor.setTo(0.7, 0.2);
        addPlayerBtn.anchor.setTo(0.7, 2);

        var style = { font: 'bold 32px Arial', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
        player1 = this.game.add.text(0, 0, ' ', style);
        player2 = this.game.add.text(0, 0, ' ', style);
        player3 = this.game.add.text(0, 0, ' ', style);
        player4 = this.game.add.text(0, 0, ' ', style);
        player5 = this.game.add.text(0, 0, ' ', style);
        player6 = this.game.add.text(0, 0, ' ', style);

        player1.setTextBounds(0, 100, 600, 100);
        player2.setTextBounds(0, 150, 600, 100);
        player3.setTextBounds(0, 200, 600, 100);
        player4.setTextBounds(0, 250, 600, 100);
        player5.setTextBounds(0, 300, 600, 100);
        player6.setTextBounds(0, 350, 600, 100);

        text.anchor.setTo(0.5, 0.5);

        $('#form1').show();
    },
    startGameOnClick: function () {
        if (checkIfEnoughPlayersAreAdded()) {
            this.state.start('Game');
            $(document).ready(function () {
                $('#form1').hide();
            });
        }
    },
    addPlayerOnClick: function () {
        if (players.length < GameStates.MAX_PLAYERS) {
            var nameInput = $('#name').val();
            
            var color = getColorFromCOLORS();
            
            if (validateNameInput(nameInput)) {
                var player = addPlayer(0, nameInput, color);

                if (players.length === 1) {
                    player1.setText(player.name + ' ' + player.color);
                    var removePlayer1Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 2, 'removePlayer1Btn', function () {
                        removePlayer(player.name);
                        player1.setText('');
                        removePlayer1Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if (players.length === 2) {
                    player2.setText(player.name + ' ' + player.color);
                    var removePlayer2Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 2.8, 'removePlayer2Btn', function () {
                        removePlayer(player.name);
                        player2.setText('');
                        removePlayer2Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if (players.length === 3) {
                    player3.setText(player.name + ' ' + player.color);
                    var removePlayer3Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 3.3, 'removePlayer3Btn', function () {
                        removePlayer(player.name);
                        player3.setText('');
                        removePlayer3Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if (players.length === 4) {
                    player4.setText(player.name + ' ' + player.color);
                    var removePlayer4Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 3.7, 'removePlayer4Btn', function () {
                        removePlayer(player.name);
                        player4.setText('');
                        removePlayer4Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if (players.length === 5) {
                    player5.setText(player.name + ' ' + player.color);
                    var removePlayer5Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 3.9, 'removePlayer5Btn', function () {
                        removePlayer(player.name);
                        player5.setText('');
                        removePlayer5Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                    }, this);
                }
                if (players.length === 6) {
                    player6.setText(player.name + ' ' + player.color);
                    var removePlayer6Btn = this.add.button(this.world.centerX, this.world.centerY * players.length / 4.0, 'removePlayer6Btn', function () {
                        removePlayer(player.name);
                        player6.setText('');
                        removePlayer6Btn.destroy();
                        if (players.length < GameStates.MAX_PLAYERS)
                            addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                }
                console.log(player, 'added');
                console.log(players);
                if (players.length === GameStates.MAX_PLAYERS) {
                    addPlayerBtn.visible = false;
                    $('#form1').hide();
                }
                this.showPlayers(player);
            }
            $('#name').val('');
        }
    },
    showPlayers: function () {
        var bar = this.game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

    }
};

function getColorFromCOLORS() {
    return GameStates.COLORS[players.length];
}

function checkIfPlayerNameExists(nameInput) {
    for (var i = 0; i < players.length; i++) {
        if (nameInput.toLowerCase() === players[i].name.toLowerCase()) {
            return true;
        }
    }
    return false;
}

function validateNameInput(nameInput) {
    var message = document.getElementById('message');
    message.innerHTML = '';
    var playerNameExists = checkIfPlayerNameExists(nameInput);

    if (nameInput === '') {
        message.innerHTML = "<span style='color: red;'>Name can not be empty!</span>";
        return false;
    }
    else if (!isNaN(nameInput)) {
        message.innerHTML = "<span style='color: red;'>Name can not contain numbers only.</span>";
        return false;
    }
    else if (playerNameExists) {
        message.innerHTML = "<span style='color: red;'>Name already exists, please choose a different name.</span>";
        return false;
    }
    else {
        return true;
    }
}

function checkIfEnoughPlayersAreAdded() {
    var message = document.getElementById('message');
    message.innerHTML = '';
    if (players.length < 1) {
        message.innerHTML = "<span style='color: red;'>No players added!</span>";
        return false;
    }
    else if (players.length < 2) {
        message.innerHTML = "<span style='color: red;'>Need atleast 2 players to play.</span>";
        return false;
    }
    else {
        return true;
    }
}

function setTerritories(game) {


    var bilgaard = new Territory(game, 'Bilgaard', 370, 56);
    var havankpark = new Territory(game, 'Havankpark', 462, 12);
    var vrijheidswijk = new Territory(game, 'Vrijheidswijk', 488, 62);
    var blitsaerd = new Territory(game, 'Blitsaerd', 606, 13);
    var camminghaburen = new Territory(game, 'Camminghaburen', 712, 123);
    var heechterp = new Territory(game, 'Heechterp', 574, 94);
    var schieringen = new Territory(game, 'Schieringen', 592, 155);
    var schepenbuurt = new Territory(game, 'Schepenbuurt', 580, 245);
    var wielenpolle = new Territory(game, 'Wielenpôlle', 572, 306);
    var de_hemrik = new Territory(game, 'De Hemrik', 726, 260);
    var aldlan = new Territory(game, 'Aldlân', 540, 370);
    var zuiderburen = new Territory(game, 'Zuiderburen', 630, 410);
    var goutum = new Territory(game, 'Goutum', 470, 440);
    var nijlan = new Territory(game, 'Nijlân', 300, 370);
    var achter_de_hoven = new Territory(game, 'Achter de Hoven', 495, 269);
    var huizum_oost = new Territory(game, 'Huizum-oost', 470, 326);
    var huizum_west = new Territory(game, 'Huizum-west', 360, 308);
    var oranjewijk = new Territory(game, 'Oranjewijk', 435, 244);
    var cambuur = new Territory(game, 'Cambuur', 500, 158);
    var binnenstad = new Territory(game, 'Binnenstad', 388, 208);
    var bloemenbuurt = new Territory(game, 'Bloemenbuurt', 440, 118);
    var transvaalwijk = new Territory(game, 'Transvaalwijk', 365, 127);
    var vogelwijk = new Territory(game, 'Vogelwijk', 293, 154);
    var valeriuskwartier = new Territory(game, 'Valeriuskwartier', 263, 116);
    var westeinde = new Territory(game, 'Westeinde', 197, 125);
    var vossenparkwijk = new Territory(game, 'Vossenparkwijk', 290, 221);
    var industrieterrein_west = new Territory(game, 'Industrieterrein-west', 198, 260);

    territories.push(bilgaard);
    territories.push(havankpark);
    territories.push(vrijheidswijk);
    territories.push(blitsaerd);
    territories.push(camminghaburen);
    territories.push(heechterp);
    territories.push(schieringen);
    territories.push(schepenbuurt);
    territories.push(wielenpolle);
    territories.push(de_hemrik);
    territories.push(aldlan);
    territories.push(zuiderburen);
    territories.push(goutum);
    territories.push(nijlan);
    territories.push(achter_de_hoven);
    territories.push(huizum_oost);
    territories.push(huizum_west);
    territories.push(oranjewijk);
    territories.push(cambuur);
    territories.push(binnenstad);
    territories.push(bloemenbuurt);
    territories.push(transvaalwijk);
    territories.push(vogelwijk);
    territories.push(valeriuskwartier);
    territories.push(westeinde);
    territories.push(vossenparkwijk);
    territories.push(industrieterrein_west);

    westeinde.setBorderTerritories([industrieterrein_west, valeriuskwartier]);
    valeriuskwartier.setBorderTerritories([westeinde, industrieterrein_west, vogelwijk]);
    industrieterrein_west.setBorderTerritories([westeinde, valeriuskwartier, vossenparkwijk, huizum_west, nijlan]);
    vogelwijk.setBorderTerritories([valeriuskwartier, vossenparkwijk, transvaalwijk]);
    vossenparkwijk.setBorderTerritories([vogelwijk, industrieterrein_west, huizum_west, binnenstad]);
    huizum_west.setBorderTerritories([nijlan, industrieterrein_west, vossenparkwijk, binnenstad, oranjewijk, achter_de_hoven, huizum_oost, aldlan]);
    nijlan.setBorderTerritories([industrieterrein_west, huizum_west, aldlan]);
    bilgaard.setBorderTerritories([valeriuskwartier, transvaalwijk, vrijheidswijk, havankpark]);
    transvaalwijk.setBorderTerritories([vogelwijk, bilgaard, bloemenbuurt, binnenstad]);
    binnenstad.setBorderTerritories([vossenparkwijk, transvaalwijk, bloemenbuurt, cambuur, oranjewijk, huizum_west]);
    havankpark.setBorderTerritories([bilgaard]);
    vrijheidswijk.setBorderTerritories([bilgaard, bloemenbuurt, heechterp, blitsaerd]);
    bloemenbuurt.setBorderTerritories([transvaalwijk, binnenstad, cambuur, heechterp, vrijheidswijk]);
    cambuur.setBorderTerritories([oranjewijk, binnenstad, bloemenbuurt, vrijheidswijk, heechterp, schieringen]);
    oranjewijk.setBorderTerritories([binnenstad, huizum_west, achter_de_hoven, schepenbuurt, cambuur]);
    achter_de_hoven.setBorderTerritories([oranjewijk, huizum_west, huizum_oost, schepenbuurt]);
    huizum_oost.setBorderTerritories([achter_de_hoven, huizum_west, aldlan, wielenpolle]);
    aldlan.setBorderTerritories([nijlan, huizum_west, huizum_oost, wielenpolle, de_hemrik, zuiderburen, goutum]);
    goutum.setBorderTerritories([aldlan, zuiderburen]);
    zuiderburen.setBorderTerritories([aldlan, goutum]);
    blitsaerd.setBorderTerritories([vrijheidswijk]);
    heechterp.setBorderTerritories([vrijheidswijk, bloemenbuurt, cambuur, schieringen, camminghaburen]);
    schieringen.setBorderTerritories([heechterp, cambuur, schepenbuurt, de_hemrik, camminghaburen]);
    schepenbuurt.setBorderTerritories([de_hemrik, schieringen, oranjewijk, achter_de_hoven, wielenpolle]);
    wielenpolle.setBorderTerritories([schepenbuurt, huizum_oost, aldlan, de_hemrik]);
    camminghaburen.setBorderTerritories([heechterp, schieringen, de_hemrik]);
    de_hemrik.setBorderTerritories([aldlan, wielenpolle, schepenbuurt, schieringen, camminghaburen]);

    // territories.push(new Territory(game, 'Bilgaard', 370, 56));
    // territories.push(new Territory(game, 'Havankpark', 462, 12));
    // territories.push(new Territory(game, 'Vrijheidswijk', 488, 62));
    // territories.push(new Territory(game, 'Blitsaerd', 606, 13));
    // territories.push(new Territory(game, 'Camminghaburen', 712, 123));
    // territories.push(new Territory(game, 'Heechterp', 574, 94));
    // territories.push(new Territory(game, 'Schieringen', 592, 155));
    // territories.push(new Territory(game, 'Schepenbuurt', 580, 245));
    // territories.push(new Territory(game, 'wielenpolle', 572, 306));
    // territories.push(new Territory(game, 'De Hemrik', 726, 260));
    // territories.push(new Territory(game, 'aldlan', 540, 370));
    // territories.push(new Territory(game, 'Zuiderburen', 630, 410));
    // territories.push(new Territory(game, 'Goutum', 470, 440));
    // territories.push(new Territory(game, 'nijlan', 300, 370));
    // territories.push(new Territory(game, 'Achter de Hoven', 495, 269));
    // territories.push(new Territory(game, 'Huizum-oost', 470, 326));
    // territories.push(new Territory(game, 'Huizum-west', 360, 308));
    // territories.push(new Territory(game, 'Oranjewijk', 435, 244));
    // territories.push(new Territory(game, 'Cambuur', 500, 158));
    // territories.push(new Territory(game, 'Binnenstad', 388, 208));
    // territories.push(new Territory(game, 'Bloemenbuurt', 440, 118));
    // territories.push(new Territory(game, 'Transvaalwijk', 365, 127));
    // territories.push(new Territory(game, 'Vogelwijk', 293, 154));
    // territories.push(new Territory(game, 'Valeriuskwartier', 263, 116));
    // territories.push(new Territory(game, 'Westeinde', 197, 125));
    // territories.push(new Territory(game, 'Vossenparkwijk', 290, 221));
    // territories.push(new Territory(game, 'Industrieterrein-west', 198, 260));
}