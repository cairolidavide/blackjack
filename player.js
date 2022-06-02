class Player {
    constructor(deck) {
        this.cards = [];
        this.outputDiv = document.getElementById("my-cards");
        this.deck = deck;
    }

    hasBusted() {
        return this.getSumOfCardsValue() > 21;
    }

    hasBlackjack() {
        return this.getSumOfCardsValue() == 21;
    }

    getCard() {
        let card = this.deck.getCard();
        this.cards.push(card);
    }

    getSumOfCardsValue() {
        let sum = this.cards.map(c => c.number).reduce((a, b) => a + b, 0);
        if(sum > 21) {
            for(let card of this.cards) {
                if(card.number == 11) {
                    card.number = 1;
                    alert("per evitare di sballare settiamo il valore dell'asso a uno");
                    break;
                }
            }
        }
        sum = this.cards.map(c => c.number).reduce((a, b) => a + b, 0);
        return sum;
    }

    aceValue(r1) {
        let hA11 = new Card(11, "1", "♥");
        let fA11 = new Card(11, "1", "✤");
        let dA11 = new Card(11, "1", "♦");
        let sA11 = new Card(11, "1", "♠");
        if (r1 == 0) {
            return hA11;
        } else if (r1 == 1) {
            return fA11;
        } else if (r1 == 2) {
            return dA11;
        } else if (r1 == 3) {
            return sA11;
        }
    }
}