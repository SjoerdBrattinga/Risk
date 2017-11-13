GameStates.Credit = function (game) {

};

var text;
var text1;
var text2;
var text3;

GameStates.Credit.prototype = {
    create: function () {
       text = this.add.text(300, 200, 'Made by:', {
           fontSize: '32px', fill: '#fff'})
        text1 = this.add.text(300, 230, 'Sjoerd', {
            fontSize: '32px', fill: '#fff'})
        text2 = this.add.text(300, 260, '&', {
            fontSize: '32px', fill: '#fff'})
        text3 = this.add.text(300, 290, 'Benjamin', {
            fontSize: '32px', fill: '#fff'})
    },

};