GameStates.CreateGame = function (game) {
 
};

GameStates.CreateGame.prototype = {
    startGameBtn: null,
    addPlayerBtn: null,
    player1: null,
    player2: null,
    player3: null,
    player4: null,
    player5: null,
    player6: null,
    
    create: function () {
        setTerritories(this.game);

        var backGround = this.add.sprite(this.world.centerX, this.world.centerY, 'creategame-background');
        backGround.anchor.setTo(0.5, 0.5);

        var setuptext = this.add.text(20, 30, 'Set up your game', {
            fontSize: '40px', fill: '#000000'
        });
        setuptext.anchor.setTo(0, 0.5);

        var addBotText = this.add.text(770, 245, 'Add a bot', {
            fontSize: '30px', fill: '#000000'
        });
        addBotText.anchor.setTo(0.5);

        this.startGameBtn = this.add.button(this.world.centerX, 450, 'startGameBtn', this.startGameOnClick, this);
        this.startGameBtn.anchor.setTo(0.5);

        this.addPlayerBtn = this.add.button(770, 40, 'addPlayerBtn', this.addPlayerOnClick, this);
        this.addPlayerBtn.anchor.setTo(0.5);

        var addEasyBotBtn = this.add.button(770, 300, 'addEasyBotBtn', this.addEasyBotOnClick, this);
        addEasyBotBtn.anchor.setTo(0.5);

        var addAverageBotBtn = this.add.button(770, 350, 'addAverageBotBtn', this.addAverageBotOnClick, this);
        addAverageBotBtn.anchor.setTo(0.5);

        var addHardBotBtn = this.add.button(770, 400, 'addHardBotBtn', this.addHardBotOnClick, this);
        addHardBotBtn.anchor.setTo(0.5);

        var style = { font: 'bold 32px Arial' };

        this.player1 = this.game.add.text(100, 150, '', style);
        this.player1.anchor.setTo(0, 0.5);

        this.player2 = this.game.add.text(100, 200, '', style);
        this.player2.anchor.setTo(0, 0.5);

        this.player3 = this.game.add.text(100, 250, '', style);
        this.player3.anchor.setTo(0, 0.5);

        this.player4 = this.game.add.text(100, 300, '', style);
        this.player4.anchor.setTo(0, 0.5);

        this.player5 = this.game.add.text(100, 350, '', style);
        this.player5.anchor.setTo(0, 0.5);

        this.player6 = this.game.add.text(100, 400, '', style);
        this.player6.anchor.setTo(0, 0.5);

        $('#name').val('');
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

    addEasyBotOnClick: function () {
        var botName = 'easybot';
        var count = 0;
        for (var i = 0; i < GameStates.players.length; i++) {
            if (GameStates.players[i].type === 1) {
                count++;
            }
        }
        if (count > 0) {
            botName = botName + count;
        }
        this.addPlayer(1, botName);

    },

    addAverageBotOnClick: function () {
        var botName = 'averagebot';
        var count = 0;
        for (var i = 0; i < GameStates.players.length; i++) {
            if (GameStates.players[i].type === 2) {
                count++;
            }
        }
        if (count > 0) {
            botName = botName + count;
        }
        this.addPlayer(2, botName);
    },

    addHardBotOnClick: function () {
        var botName = 'difficultbot';
        var count = 0;
        for (var i = 0; i < GameStates.players.length; i++) {
            if (GameStates.players[i].type === 3) {
                count++;
            }
        }
        if (count > 0) {
            botName = botName + count;
        }
        this.addPlayer(3, botName);
    },

    addPlayerOnClick: function () {
        var nameInput = $('#name').val();
        this.addPlayer(0, nameInput);
    },

    addPlayer: function (playerType, name) {
        if (GameStates.players.length < GameStates.MAX_PLAYERS) {

            var color = getColorFromCOLORS();

            if (validateName(name)) {
                var player = addPlayer(playerType, name, color);

                if (GameStates.players.length === 1) {
                    this.player1.setText(player.name);
                    this.player1.addColor(player.getHexaColor(), 0);
                    var removePlayer1Btn = this.add.button(this.world.centerX - 120, 150, 'removePlayer1Btn', function () {
                        removePlayer(player.name);
                        this.player1.setText('');
                        removePlayer1Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS)
                            this.addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                    removePlayer1Btn.anchor.setTo(0.5);
                }
                if (GameStates.players.length === 2) {
                    this.player2.setText(player.name);
                    this.player2.addColor(player.getHexaColor(), 0);
                    var removePlayer2Btn = this.add.button(this.world.centerX - 120, 200, 'removePlayer2Btn', function () {
                        removePlayer(player.name);
                        this.player2.setText('');
                        removePlayer2Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS)
                            this.addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                    removePlayer2Btn.anchor.setTo(0.5);
                }
                if (GameStates.players.length === 3) {
                    this.player3.setText(player.name);
                    this.player3.addColor(player.getHexaColor(), 0);
                    var removePlayer3Btn = this.add.button(this.world.centerX - 120, 250, 'removePlayer3Btn', function () {
                        removePlayer(player.name);
                        this.player3.setText('');
                        removePlayer3Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS)
                            this.addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                    removePlayer3Btn.anchor.setTo(0.5);
                }
                if (GameStates.players.length === 4) {
                    this.player4.setText(player.name);
                    this.player4.addColor(player.getHexaColor(), 0);
                    var removePlayer4Btn = this.add.button(this.world.centerX - 120, 300, 'removePlayer4Btn', function () {
                        removePlayer(player.name);
                        this.player4.setText('');
                        removePlayer4Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS)
                            this.addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                    removePlayer4Btn.anchor.setTo(0.5);
                }
                if (GameStates.players.length === 5) {
                    this.player5.setText(player.name);
                    this.player5.addColor(player.getHexaColor(), 0);
                    var removePlayer5Btn = this.add.button(this.world.centerX - 120, 350, 'removePlayer5Btn', function () {
                        removePlayer(player.name);
                        this.player5.setText('');
                        removePlayer5Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS)
                            this.addPlayerBtn.visible = true;
                        $('#form1').show();
                    }, this);
                    removePlayer5Btn.anchor.setTo(0.5);
                }
                if (GameStates.players.length === 6) {
                    this.player6.setText(player.name);
                    this.player6.addColor(player.getHexaColor(), 0);
                    var removePlayer6Btn = this.add.button(this.world.centerX - 120, 400, 'removePlayer6Btn', function () {
                        removePlayer(player.name);
                        this.player6.setText('');
                        removePlayer6Btn.destroy();
                        if (GameStates.players.length < GameStates.MAX_PLAYERS) {
                            this.addPlayerBtn.visible = true;
                            $('#form1').show();
                        }
                    }, this);
                    removePlayer6Btn.anchor.setTo(0.5);
                }
                console.log(player, 'added');
                console.log(GameStates.players);
                if (GameStates.players.length === GameStates.MAX_PLAYERS) {
                    this.addPlayerBtn.visible = false;
                    $('#form1').hide();
                }
            }
            $('#name').val('');
        }
    }
};

function validateName(name) {
    var message = document.getElementById('message');
    message.innerHTML = '';
    var playerNameExists = checkIfPlayerNameExists(name);

    if (name === '') {
        message.innerHTML = '<span style=\'color: red;\'>Name can not be empty!</span>';
        return false;
    }
    else if (!isNaN(name)) {
        message.innerHTML = '<span style=\'color: red;\'>Name can not contain numbers only.</span>';
        return false;
    }
    else if (playerNameExists) {
        message.innerHTML = '<span style=\'color: red;\'>Name already exists, please choose a different name.</span>';
        return false;
    }
    else {
        return true;
    }
}

function checkIfEnoughPlayersAreAdded() {
    var message = document.getElementById('message');
    message.innerHTML = '';
    if (GameStates.players.length < 1) {
        message.innerHTML = '<span style=\'color: red;\'>No players added!</span>';
        return false;
    }
    else if (GameStates.players.length < 2) {
        message.innerHTML = '<span style=\'color: red;\'>Need atleast 2 players to play.</span>';
        return false;
    }
    else {
        return true;
    }
}

function generateRandomName(text) {
    text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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

    GameStates.territories.push(bilgaard);
    GameStates.territories.push(havankpark);
    GameStates.territories.push(vrijheidswijk);
    GameStates.territories.push(blitsaerd);
    GameStates.territories.push(camminghaburen);
    GameStates.territories.push(heechterp);
    GameStates.territories.push(schieringen);
    GameStates.territories.push(schepenbuurt);
    GameStates.territories.push(wielenpolle);
    GameStates.territories.push(de_hemrik);
    GameStates.territories.push(aldlan);
    GameStates.territories.push(zuiderburen);
    GameStates.territories.push(goutum);
    GameStates.territories.push(nijlan);
    GameStates.territories.push(achter_de_hoven);
    GameStates.territories.push(huizum_oost);
    GameStates.territories.push(huizum_west);
    GameStates.territories.push(oranjewijk);
    GameStates.territories.push(cambuur);
    GameStates.territories.push(binnenstad);
    GameStates.territories.push(bloemenbuurt);
    GameStates.territories.push(transvaalwijk);
    GameStates.territories.push(vogelwijk);
    GameStates.territories.push(valeriuskwartier);
    GameStates.territories.push(westeinde);
    GameStates.territories.push(vossenparkwijk);
    GameStates.territories.push(industrieterrein_west);

    westeinde.setBorderTerritories([industrieterrein_west, valeriuskwartier]);
    valeriuskwartier.setBorderTerritories([bilgaard, westeinde, industrieterrein_west, vogelwijk]);
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
}

