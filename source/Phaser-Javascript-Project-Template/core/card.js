function Card(territoryName, cardType) {
    this.territoryName = territoryName;
    this.cardType = cardType;
}

Card.prototype = {
    getTerritoryName: function() {
        return this.territoryName;
    }
};

// cardtypes: Infantry, Cavalry, Artillery

function setCards() {

    cards.push(new Card('Bilgaard', 'Infantry'));
    cards.push(new Card('Havankpark', 'Infantry'));
    cards.push(new Card('Vrijheidswijk', 'Artillery'));
    cards.push(new Card('Blitsaerd', 'Cavalry'));
    cards.push(new Card('Camminghaburen', 'Infantry'));
    cards.push(new Card('Heechterp', 'Cavalry'));
    cards.push(new Card('Schieringen', 'Artillery'));
    cards.push(new Card('Schepenbuurt', 'Artillery'));
    cards.push(new Card('Wielenpôlle', 'Infantry'));
    cards.push(new Card('De Hemrik', 'Cavalry'));
    cards.push(new Card('Aldlân', 'Infantry'));
    cards.push(new Card('Zuiderburen', 'Cavalry'));
    cards.push(new Card('Goutum', 'Cavalry'));
    cards.push(new Card('Nijlân', 'Cavalry'));
    cards.push(new Card('Achter de Hoven', 'Infantry'));
    cards.push(new Card('Huizum-oost', 'Artillery'));
    cards.push(new Card('Huizum-west', 'Infantry'));
    cards.push(new Card('Oranjewijk', 'Artillery'));
    cards.push(new Card('Cambuur', 'Cavalry'));
    cards.push(new Card('Binnenstad', 'Artillery'));
    cards.push(new Card('Bloemenbuurt', 'Infantry'));
    cards.push(new Card('Transvaalwijk', 'Infantry'));
    cards.push(new Card('Vogelwijk', 'Infantry'));
    cards.push(new Card('Valeriuskwartier', 'Cavalry'));
    cards.push(new Card('Westeinde', 'Artillery'));
    cards.push(new Card('Vossenparkwijk', 'Cavalry'));
    cards.push(new Card('Industrieterrein-west', 'Infantry'));

}

